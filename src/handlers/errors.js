var term = require("terminal-kit").terminal;

function loadErrors() {
   process.on("unhandledRejection", (reason) => {
      term.red("> [ERROR] | Unhandled Rejection\n");
      term.red(reason, "\n");
   });
   process.on("uncaughtException", (err) => {
      term.red("> [ERROR] | Uncaught Exception\n");
      term.red(err, "\n");
   });
   process.on("uncaughtExceptionMonitor", (err) => {
      term.red("> [ERROR] | Uncaught Exception (Monitor)\n");
      term.red(err, "\n");
   });
}

module.exports = { loadErrors };
