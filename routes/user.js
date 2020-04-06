const express = require("express");

const { sayHi } = require("../controllers/user");

const router = express.Router();

router.get("/user", sayHi);

module.exports = router;
