const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await User.create({ firstName, lastName, email, passwordHash });
  res.status(201).json(user.toJSON());
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  let isPasswordCorrect = false;
  if (user) {
    isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  }

  if (isPasswordCorrect) {
    res.status(200).json(user.toJSON());
  } else {
    res.status(404).json("Invalid email or password.");
  }
};
