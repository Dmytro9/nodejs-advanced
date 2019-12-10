const express = require("express");
const app = express();
const Worker = require("webworker-threads").Worker;

app.get("/", (req, res) => {
  const worker = new Worker(function() {
    this.onmessage = function() {
      let counter = 0;

      while (counter < 1e9) {
        counter++;
      }

      postMessage();
    };
  });

  worker.onmessage = function(myCounter) {
    console.log(myCounter);
  };

  worker.postMessage();
});

app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

app.listen(3000, () => {
  console.log("Listening to 3000 port");
});
