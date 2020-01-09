const User = require("../models/user");

module.exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = password;
  const user = await User.create({ firstName, lastName, email, passwordHash });
  res.status(201).json(user.toJSON());
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passwordHash = password;

  if (user.passwordHash === passwordHash) {
    res.status(200).json(user.toJSON());
  } else {
    res.status(404).json("Invalid email or password.");
  }
};
