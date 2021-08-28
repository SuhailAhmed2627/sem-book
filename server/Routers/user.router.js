const Router = require("express").Router;

const {
   signUpUser_POST,
   logInUser_POST,
} = require("../Controllers/user.controller.js");

const router = Router();

router.post("/signup", signUpUser_POST);
router.post("/login", logInUser_POST);

module.exports = router;
