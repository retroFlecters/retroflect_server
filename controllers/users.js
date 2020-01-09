const User = require("../models/user");

module.exports.create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = password;
  const user = await User.create({ firstName, lastName, email, passwordHash });
  res.status(201).json(user.toJSON());
};
