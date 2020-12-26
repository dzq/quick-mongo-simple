const express = require('express');
const app = express();
const port = 9008
const ip = "127.0.0.1"
//#region XML,JSON和Cookie支持
const bodyParser = require('body-parser')
app.use(bodyParser.json({limit: '50mb'})); // json支持
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// cookieParser
// const cookieParser = require('cookie-parser')
// app.use(cookieParser())
//#endregion
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