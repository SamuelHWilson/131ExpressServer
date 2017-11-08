var express = require('express');
var server = express();
var path = require("path");
var fs = require("fs");
var _ = require("lodash");

// --- Find all html files in root, and add to array. ---
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
    server.get([fname, fname.substring(0,fname.length-5)], function (req, res) { //Adds for both [file].html and [file]
        res.sendFile(path.join(__dirname, fname));
    });
});

//Specific handler to respond to requests for / with index.html
server.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

//If there is no file, send 404.
server.get("*", function(req, res) {
    res.status(404).sendFile(path.join(__dirname, "/notfound.html"));
});

// --- Launch server. --- 
server.listen(3000, () => {
    console.log("SamServ listening on port 3000.");
});