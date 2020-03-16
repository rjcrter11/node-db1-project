const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

// ---- Server Test ---- //
server.get("/", (req, res) => {
  res.status(200).send("<h3>Node DB Project</h3>");
});

server.get("/api/accounts", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((rows) => {
      res.status(200).json({ data: rows });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Sorry, an error has occured" });
    });
});

server.get("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then((account) => {
      if (account) {
        res.status(200).json({ data: account });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving account" });
    });
});

server.post("/api/accounts", (req, res) => {
  db("accounts")
    .insert(req.body, "id")
    .then((ids) => {
      const id = ids[0];
      return db("accounts")
        .where({ id })
        .first()
        .then((account) => {
          res.status(201).json(account);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error adding account" });
    });
});

server.put("/api/accounts/:id", (req, res) => {
  const changes = req.body;
  db("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ success: ` ${count} account updated` });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error updating account" });
    });
});

server.delete("/api/accounts/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ success: `${count} account(s) deleted` });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error deleting account" });
    });
});

module.exports = server;
