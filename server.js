const express = require("express");
const cors = require("cors");
const helmet = require("helmet");


const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const rootRouter = require("./router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/auth", authRouter);
server.use("/users", restricted, usersRouter);
server.use("/", restricted, rootRouter);

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to our expat-journal-2 API!",
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong.",
  });
});

module.exports = server;
