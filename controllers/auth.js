const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
// const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Email already exists.",
          //   error: errorHandler(err),
        });
      }

      //res --undefine some fields
      user.salt = undefined;
      user.hashed_password = undefined;

      res.status(200).json({ user });
    });
  } catch (err) {
    console.error(err.message);
  }
};

exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }

    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match",
      });
    }

    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

//middleware
//Req Header  -- Authorization  = Bearer xxxxxx
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

//middleware
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

//middleware  --role 1 == Admin 0 == NotAdmin
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};
