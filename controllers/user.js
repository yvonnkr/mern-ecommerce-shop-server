const User = require("../models/user");

const { errorHandler } = require("../helpers/dbErrorHandler");

// using async/await
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
