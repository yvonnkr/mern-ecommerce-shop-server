// const express = require("express");
// // const morgan = require("morgan");
// // const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const expressValidator = require("express-validator");
// const mongoose = require("mongoose");

// require("dotenv").config();

// // const connectDB = require("./db/db-connect");

// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/product");
// const braintreeRoutes = require("./routes/braintree");
// const orderRoutes = require("./routes/order");

// // app
// const app = express();

// //connect db
// // connectDB();

// // middlewares
// // app.use(morgan("dev"));
// // app.use(bodyParser.json());
// app.use(express.json({ extended: false }));
// app.use(cookieParser());
// app.use(expressValidator());
// app.use(cors());

// // routes middleware
// app.use("/api", authRoutes);
// app.use("/api", userRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);
// app.use("/api", braintreeRoutes);
// app.use("/api", orderRoutes);

// const PORT = process.env.PORT || 8000;

// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to database");

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("Connection to Database failed");
//     console.error(err.message);
//   });

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server app on port ${PORT}`));
