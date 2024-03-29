process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require("cluster");

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  const express = require("express");
  const app = express();
  const crypto = require("crypto");

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.end("Hi there");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000, () => {
    console.log("Listening to 3000 port");
  });
}
