const express = require("express");
const config = require("./config");

const { loadClient } = require("./miro");

let term = require("terminal-kit").terminal;

const app = express();
const http = require("http").Server(app);

app.use("/", (req, res) => res.send("404"));

// Require bot file
loadClient().then(() => {
   http.listen(config.port);
   term.cyan(`> [WEB] | Listen on http://localhost:${config.port}\n`);
});
