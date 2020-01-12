const jwt = require("jsonwebtoken");

module.exports.authenticate = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    token = token.replace("Bearer ", "");
    const user = await jwt.verify(token, process.env.SECRET);
    req.body.user = user;
    next();
  } catch (error) {
    res.status(401).json("Invalid or missing token.");
  }
};
