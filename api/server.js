const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("<h3>Node DB Project</h3>");
});

module.exports = server;
