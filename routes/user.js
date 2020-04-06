const express = require("express");

const { signup } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);

module.exports = router;
