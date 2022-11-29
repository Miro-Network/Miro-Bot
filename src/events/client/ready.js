const { Client } = require("discord.js");
var term = require("terminal-kit").terminal;

module.exports = {
   name: "ready",
   once: true,
   /**
    *
    * @param {Client} client
    */
   execute(client) {
      term.cyan(`> [CLIENT] | Logged in as ${client.user.tag}`);
   },
};
