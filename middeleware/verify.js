const verifyJwt = require("../helpers/jwtHelpers").verifyJwt;
require("dotenv/config");

exports.verify = function (req, res, next) {
  if (req.method == "OPTIONS") {
    return res.status(200).send();
  }

  const jwt = req.cookies.jwt;
  if (!jwt) {
    return res.status(401).json({ error: Error("jwt was not found") });
  }

  const secret = process.env.ACCESS_TOKEN_SECRET;
  const verifyResponse = verifyJwt(jwt, secret);
  if (!verifyResponse.ok) {
    return res.status(401).json({ error: verifyResponse.error }).send();
  }

  req.userData = verifyResponse.value;
  next();
};
