const jwt = require("jsonwebtoken");
const usersModal = require("../model/usersModel");

function authenticateTokenQuery(req, res, next) {
  const token = req.query.token && req.query.token.split(" ")[1];

  if (!token) {
    return res.status(401).send("invalid token");
  }
  jwt.verify(token, process.env.TOKEN_SR, async (err, user) => {
    if (err) return res.status(403).send("invalid token");
    req.user = await usersModal.findOne({ email: user.email });
  });
  next();
}

module.exports = authenticateTokenQuery;
