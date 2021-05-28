const jwt = require("jsonwebtoken");

require('dotenv').config();

module.exports = function(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    req.user = jwt.verify(token, config.privateKey);
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};