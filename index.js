const express = require('express');
const app = express();
const port = 9008
const ip = "127.0.0.1"
//region router
const router = require("./router");
app.use("/", router);
// endregion
//#region httpserver
let http = require("http");
let http_server = http.createServer(app);
http_server.listen(port, ip)
console.log("Start Server : http://" + ip + ":" + port)
//#endregion