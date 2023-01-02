const express = require("express");

const config = require("./config");
const { loadClient } = require("./miro");

let term = require("terminal-kit").terminal;

function loadWeb() {
   const app = express();

   app.get("/", (req, res) => res.send("Online!"));
   app.listen(config.web.port, () =>
      term.cyan(`> [WEB] | Listening on http://localhost:${config.web.port}\n`)
   );
}

loadClient().then(() => {
   loadWeb();
});
