const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors());

// routes middleware

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
