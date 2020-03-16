const express = require("express");
const AccountRouter = require("./account-router");

const server = express();

server.use(express.json());
server.use("/api/accounts", AccountRouter);

server.get("/", (req, res) => {
  res.status(200).send("<h3>Node DB Project</h3>");
});

module.exports = server;
