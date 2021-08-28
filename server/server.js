const express = require("express");
const morgan = require("morgan");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const { json, urlencoded } = require("body-parser");
const path = require("path");
const cors = require("cors");
const User = require("./Models/user.model.js");
const Page = require("./Models/page.model.js");

const { protect } = require("./Auth/auth.js");

mongoose.connect("mongodb://localhost:27017/test", {
   useNewUrlParser: true,
});

var gfs;

connection = mongoose.connection;

connection.once("open", () => {
   gfs = Grid(connection.db, mongoose.mongo);
   gfs.collection("uploads");
});

const storage = new GridFsStorage({
   url: "mongodb://localhost:27017/test",
   file: (req, file) => {
      return new Promise((resolve, reject) => {
         crypto.randomBytes(16, (err, buf) => {
            if (err) {
               return reject(err);
            }
            const filename =
               buf.toString("hex") + path.extname(file.originalname);
            const fileInfo = {
               filename: filename,
               bucketName: "uploads",
            };
            resolve(fileInfo);
         });
      });
   },
});
const upload = multer({ storage });

const userRouter = require("./Routers/user.router.js");
const pageRouter = require("./Routers/page.router.js");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/page", pageRouter);
app.post("/api/getuser", protect, async (req, res) => {
   console.log(req.body.user);
   res.status(200).send(req.body.user);
});

app.post("/api/upload/:page", upload.single("files"), async (req, res) => {
   console.log(req.params.page);
   const files = req.file;
   const filename = files.filename;
   const line = `<img src:"localhost:3000/file/${filename}">`;

   let page;
   await Page.findOne({ id: req.params.page }).then(() => {
      page.content = page.content + "\n" + line;
   });
   await Page.findOneAndUpdate({ id: req.params.page }, page);
   res.status(200);
});

app.get("/file/:filename", (req, res) => {
   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
         return res.status(404).json({
            err: "No file exists",
         });
      }
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
   });
});

const port = 3000;

app.listen(port, () => console.log(`http://localhost:${port}`));
