const { CommandInteraction, Client } = require("discord.js");

module.exports = {
   name: "interactionCreate",
   /**
    *
    * @param {CommandInteraction} interaction
    * @param {Client} client
    */
   execute(interaction, client) {
      if (!interaction.isChatInputCommand()) return;

      const commands = client.commands.get(interaction.commandName);
      if (!commands)
         return interaction.reply({
            content: "This command is outdated!",
            ephemeral: true,
         });

      commands.execute(interaction, client);
   },
};
