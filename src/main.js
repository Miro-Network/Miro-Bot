const express = require("express");
const config = require("./config");

const app = express();
const http = require("http").Server(app);

// Require bot file
require("./miro");

app.use("/", (req, res) => res.send("404"));

http.listen(config.port);
