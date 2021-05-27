const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwtHelpers = require("../helpers/jwtHelpers");
const bcryptHelpers = require("../helpers/bcryptHelpers");
const userHelpers = require("../helpers/userHelpers");
const SECRET = process.env.ACCESS_TOKEN_SECRET;
const EXPIRE = process.env.ACCESS_TOKEN_LIFE;

router.get("/verify", (req, res) => {
  const jwt = req.cookies.jwt;
  if (!jwt) {
    return res.status(401).json({ error: "jwt was not found" }).send();
  }
  const response = jwtHelpers.verifyJwt(jwt, SECRET);
  if (response.ok) {
    return res.status(200).send();
  }
  res.status(401).send();
});

// LOGIN
router.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  //get user
  const userResponse = await userHelpers.getUser(username, User);
  if (!userResponse.ok || userResponse.value === null) {
    return res.status(401).json({ error: userResponse.error }).send();
  }

  //compare passwords
  const hash = userResponse.value.password;
  const compareResponse = await bcryptHelpers.compareHash(password, hash);
  if (!compareResponse.ok || compareResponse.value === false) {
    return res
      .status(401)
      .json({ error: Error("invalid password") })
      .send();
  }

  //generate token
  const jwtResponse = jwtHelpers.generateJwt(
    { id: userResponse.value.id },
    SECRET,
    EXPIRE
  );
  if (!jwtResponse.ok) {
    return res.status(401).json({ error: jwtResponse.error }).send();
  }
  const token = jwtResponse.value;

  //response
  res.status(200).cookie("jwt", token).send();
});

// REGISTRATION
router.post("/reg", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  console.log("1");
  //get user
  const userResponse = await userHelpers.getUser(username, User);
  if (userResponse.ok) {
    return res.status(401).json({ error: userResponse.error }).send();
  }
  
  
  console.log("2");
  
  const encryptResponse = await bcryptHelpers.encrypt(password, 10);
  if (!encryptResponse.ok) {
    console.log(encryptResponse.error);
    return res.status(401).json({ error: encryptResponse.error });
  }
  console.log("3");
  const encryptedPassword = encryptResponse.value;
  const registrationResponse = await userHelpers.submitUser(
    username,
    encryptedPassword,
    User
  );
  console.log("4");

  if (!registrationResponse.ok) {
    return res.status(401).json({ error: registrationResponse.error }).send();
  }

  console.log(registrationResponse.value);

  //generate token
  const jwtResponse = jwtHelpers.generateJwt(
    { id: registrationResponse.value._id },
    SECRET,
    EXPIRE
  );
  if (!jwtResponse.ok) {
    return res.status(401).json({ error: jwtResponse.error }).send();
  }
  const token = jwtResponse.value;
  console.log("5");

  //response
  res.status(200).cookie("jwt", token).send();
});

module.exports = router;
