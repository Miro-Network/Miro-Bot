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
      if (client.config.db.mongoDB === "")
         return term.red("> [DATABASE] | No database url given, skipped\n");

      try {
         mongoose.set("strictQuery", false);
         await mongoose.connect(client.config.db.mongoDB || "", {
            keepAlive: true,
         });
         if (mongoose.connect)
            term.cyan("> [DATABASE] | Successfully connected to database\n");
      } catch (err) {
         term.red(err, "\n");
      }

      term.cyan(`> [CLIENT] | Logged in as ${client.user.tag}\n`);
   },
};
