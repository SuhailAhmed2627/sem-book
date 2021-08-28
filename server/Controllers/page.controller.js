const Page = require("../Models/page.model.js");

exports.addPage_POST = async (req, res) => {
   await Page.create({
      user: req.body.user._id,
      sem: req.body.sem,
      book: req.body.book,
   });
   return res.status(201).send({ message: "success" });
};

exports.getPage_POST = async (req, res) => {
   const pages = await Page.find({
      user: req.body.user._id,
      sem: req.body.sem,
      book: req.body.book,
   });
   return res.status(201).send(pages);
};

exports.savePage_POST = async (req, res) => {
   const pages = await Page.findOneAndUpdate({
      content: req.body.content,
      user: req.body.user._id,
      sem: req.body.sem,
      book: req.body.book,
   });
   return res.status(201).send(pages);
};
