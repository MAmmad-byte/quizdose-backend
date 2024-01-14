const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  let token = req.header("auth");
  if (!token) res.status(401).send("Access denied! No Token Provided.");
  try {
    decoded = jwt.verify(token, "MySecureKey");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};
