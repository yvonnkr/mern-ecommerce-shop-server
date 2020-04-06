const User = require("../models/user");

// using async/await
exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Email is taken",
        });
      }
      res.status(200).json({ user });
    });
  } catch (err) {
    console.error(err.message);
  }
};
