const { table } = require("node:console");

function loadCommands(client) {
   const ascii = require("ascii-table");
   const fs = require("node:fs");

   const table = new ascii().setHeading("Commands", "Status");

   let commandsArray = [];

   const commandsFolder = fs.readdirSync("./src/commands");
   for (const folder of commandsFolder) {
      const commandsFiles = fs
         .readdirSync(`./src/commands/${folder}`)
         .filter((file) => file.endsWith(".js"));
      for (const file of commandsFiles) {
         const commandFile = require(`../commands/${folder}/${file}`);

         client.commands.set(commandFile.data.name, commandFile);
         commandsArray.push(commandFile.data.toJSON());

         table.addRow(file, "✅");
         // continue;
      }
   }

   client.application.commands.set(commandsArray);

   return console.log(table.toString());
}

module.exports = { loadCommands };
