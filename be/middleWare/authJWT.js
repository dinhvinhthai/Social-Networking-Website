const jwt = require("jsonwebtoken");
const usersModal = require("../model/usersModel");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("invalid token");
  }
  jwt.verify(token, process.env.TOKEN_SR, async (err, user) => {
    if (err) return res.status(403).send("invalid token");
    req.user = await usersModal.findOne({ email: user.email });
    next();
  });
}

module.exports = authenticateToken;
