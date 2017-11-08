// --- Requires ---
var http = require("http");
var url = require("url");
var fs = require("fs");
var _ = require("lodash");

// --- Register files. ---
var allFiles = fs.readdirSync("./");

var htmlFiles = [];
var htmlReg = /.html$/;
_.forEach(allFiles, (value) => {
    if (htmlReg.test(value) == true) {
        htmlFiles.push(value);
    }
});
console.log(htmlFiles);

// --- Server code. ---
http.createServer(function(req, res) {
    var reqFile = url.parse(req.url).pathname.substring(1);
    console.log(url.parse(req.url).pathname);
    if (reqFile === "") {
        reqFile = "index.html";
    }

    if (_.includes(htmlFiles, reqFile)) {
        res.writeHead("200", {
            "Content-type":"text/html"
        });

        fs.readFile(reqFile, (err, data) => {
            res.end(data);
        });
    }
    else {
        res.writeHead("404", {
            "Content-type":"text/html"
        });
        fs.readFile("notfound.html", (err, data) => {
            res.end(data);
        });
    }
    
}).listen(3000);

console.log("My server is now running.");