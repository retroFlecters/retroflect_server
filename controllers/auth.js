const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await User.create({ firstName, lastName, email, passwordHash });
  res.status(201).json(user.toJSON());
};

module.exports.signin = async (req, res) => {
  const { body } = req;
  const user = await User.findOne({ email: body.email });

  let isPasswordCorrect = false;
  if (user) {
    isPasswordCorrect = await bcrypt.compare(body.password, user.passwordHash);
  }

  if (isPasswordCorrect) {
    const userForToken = {
      email: user.email,
      // eslint-disable-next-line no-underscore-dangle
      id: user._id
    };

    const token = `Bearer ${jwt.sign(userForToken, process.env.SECRET)}`;

    const tokenCookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 1000 * 365 * 24 * 3600000) // expire cookie after 1000 years
    };
    res.cookie("token", token, tokenCookieOptions);
    const { email, firstName, lastName } = user;
    res.status(200).json({ email, firstName, lastName });
  } else {
    res.status(401).json("Invalid email or password.");
  }
};

module.exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json("Successfully signed out.");
};
