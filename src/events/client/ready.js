const { Client } = require("discord.js");
const { mongoose } = require("mongoose");
var term = require("terminal-kit").terminal;

module.exports = {
   name: "ready",
   once: true,
   /**
    *
    * @param {Client} client
    */
   async execute(client) {
      await mongoose.connect(client.config.mongoDB || "", {
         keepAlive: true,
      });
      if (mongoose.connect)
         term.cyan("> [DATABASE] | Successfully connected to database\n");

      term.cyan(`> [CLIENT] | Logged in as ${client.user.tag}\n`);
   },
};
