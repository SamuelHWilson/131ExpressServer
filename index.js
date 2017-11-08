var express = require('express');
var server = express();
var path = require("path");
var fs = require("fs");
var _ = require("lodash");

// --- Find all html files. ---
var allFiles = fs.readdirSync("./");

var htmlFiles = [];
var htmlReg = /.html$/;
_.forEach(allFiles, (value) => {
    if (htmlReg.test(value) == true) {
        htmlFiles.push("/" + value);
    }
});

// --- Add express get handler for all files.
_.forEach(htmlFiles, (fname) => {
    server.get([fname, fname.substring(0,fname.length-5)], function (req, res) { //Array is used to allow omition of .html
        res.sendFile(path.join(__dirname, fname));
    });
});

//Add one for /
server.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

//If there is no file, send 404
server.get("*", function(req, res) {
    res.status(404).sendFile(path.join(__dirname, "/notfound.html"));
});

// --- Launch server. --- 
server.listen(3000, () => {
    console.log("Listening on port 3000.");
});