let term = require("terminal-kit").terminal;

function registerCommands(client) {
   const { REST, Routes } = require("discord.js");
   const fs = require("node:fs");

   const commands = [];
   const commandsFolder = fs.readdirSync("./src/commands");

   for (const folder of commandsFolder) {
      const commandsFiles = fs
         .readdirSync(`./src/commands/${folder}`)
         .filter((file) => file.endsWith(".js"));
      for (const file of commandsFiles) {
         const commandFile = require(`../commands/${folder}/${file}`);

         client.commands.set(commandFile.data.name, commandFile);
         commands.push(commandFile.data.toJSON());
      }
   }

   const rest = new REST({ version: "10" }).setToken(client.config.token);
   (async () => {
      try {
         const data = await rest.put(
            Routes.applicationCommands(client.config.clientId),
            { body: commands }
         );

         term.yellow(
            `[DEV] | Successfully reloaded ${data.length} application (/) commands\n`
         );
      } catch (error) {
         console.error(error);
      }
   })();
}

module.exports = { registerCommands };
