var express = require('express');
var app = express();
var path = require("path");

app.get(["/","index.html"], function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/about.html", function (req, res) {
    res.sendFile(path.join(__dirname, "/about.html"));
});
 
app.listen(3000, () => {
    console.log("Listening on port 3000.");
});