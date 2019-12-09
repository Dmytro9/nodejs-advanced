const http = require("http");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

function doRequest() {
  http
    .request("http://www.google.com", res => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log('doRequest ', Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}

doRequest();

fs.readFile("multitask.js", "utf-8", () => {
  console.log("FS:", Date.now() - start);
});


doHash();
doHash();
doHash();
doHash();