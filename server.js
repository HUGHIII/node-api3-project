const express = require("express");
const helmet = require("helmet");
const logger = require("./logger");
const server = express();
const userRouter = require("./users/userRouter");
const cors = require("cors");

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use("/api/users", logger, userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

module.exports = server;
