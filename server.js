const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")

const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/users-router")
const rootRouter = require("./router")
const restrict = require("./auth/authenticate-middleware")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())

server.get('/', (req, res) => {
  res.json({
    message: "Welcome to our Expat"
  })
})

server.use("/auth", authRouter)
server.use("/users", restrict(),  usersRouter)
server.use(rootRouter)

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong.",
  });
});

module.exports = server
