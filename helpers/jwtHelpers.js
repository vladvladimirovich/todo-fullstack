const jwt = require("jsonwebtoken");
require("dotenv/config");

function verifyJwt(token, secret) {
  try {
    const decryptedToken = jwt.verify(token, secret);
    return {
      ok: true,
      value: decryptedToken, 
    }
  } catch (err) {
    return {
      ok: false,
      error: err,
    }
  }
}

function generateJwt(payload, secret, expiresIn) {
  try {
    const token = jwt.sign(payload, secret, {
      expiresIn: expiresIn,
      algorithm: "HS256",
    });
    return {
      ok: true,
      value: token,
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
}

module.exports = {
  generateJwt,
  verifyJwt,
};
