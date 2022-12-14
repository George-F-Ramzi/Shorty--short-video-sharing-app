const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.header("x-auth-token"), process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = Auth;
