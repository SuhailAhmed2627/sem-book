const mongoose = require("mongoose");
const { Schema } = mongoose;

const pageSchema = new Schema({
   content: {
      type: String,
      default: "",
   },
   sem: Number,
   book: Number,
   user: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
});

module.exports = mongoose.model("page", pageSchema);
