const { Client } = require("discord.js");
const { mongoose } = require("mongoose");
let term = require("terminal-kit").terminal;

module.exports = {
   name: "ready",
   once: true,
   /**
    *
    * @param {Client} client
    */
   async execute(client) {
      if (client.config.mongoDB === "")
         return term.red("> [DATABASE] | No database url given, skipped\n");

      await mongoose.connect(client.config.mongoDB || "", {
         keepAlive: true,
      });
      if (mongoose.connect)
         term.cyan("> [DATABASE] | Successfully connected to database\n");

      term.cyan(`> [CLIENT] | Logged in as ${client.user.tag}\n`);
   },
};
