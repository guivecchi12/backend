const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const db = require("../users/users-model");

router.post("/register", (req, res) => {
  const newUser = req.body;

  if (!newUser.password || !newUser.username) {
    res.status(400).json({
      message: "Must provide username and password",
    });
  } else {
    const hash = bcrypt.hashSync(
      newUser.password,
      parseInt(process.env.SALT, 10)
    );
    newUser.password = hash;

    db.add(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        console.log("finding error", error);
        res.status(500).json({
          errorMessage: "Error with server",
        });
      });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.findBy({ username })
    .then((user) => {
      if (user[0] && bcrypt.compareSync(password, user[0].password)) {
        const token = generateToken(user[0]);

        res.status(200).json({
          id: user[0].id,
          username: user[0].username,
          token: token,
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error with server" });
    });
});

// Generate a JWT
function generateToken(user) {
  const jwtSecret = process.env.JWT_SECRET;
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const secret = jwtSecret;
  const options = {
    expiresIn: "60 min",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
