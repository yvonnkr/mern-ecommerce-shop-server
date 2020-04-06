const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db/db-connect");
const userRouter = require("./routes/user");

//coonect db
connectDB();

// app
const app = express();

// middlewares
app.use(bodyParser.json());
app.use(cors());

// routes middleware
app.use("/api", userRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
