const Router = require("express").Router;

const {
   addPage_POST,
   getPage_POST,
   savePage_POST,
} = require("../Controllers/page.controller.js");

const router = Router();

router.post("/add", addPage_POST);
router.post("/get", getPage_POST);
router.post("/save", savePage_POST);

module.exports = router;
