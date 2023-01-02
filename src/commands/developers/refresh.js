const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
} = require("discord.js");
const { registerCommands } = require("../../handlers/register");
let term = require("terminal-kit").terminal;

module.exports = {
   data: new SlashCommandBuilder()
      .setName("refresh")
      .setDescription("Refresh slash commands for the guild (dev only)")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      const { user, guildId, guild } = interaction;

      if (user.id !== "695449735343112259")
         return interaction.reply({
            content: "You need to be developer to use this command",
            ephemeral: true,
         });

      try {
         term
            .yellow("[DEV] | Started refreshing slash commands in ")
            .cyan(`${guild.name} - [${guildId}}]\n`);

         registerCommands(client);

         interaction.reply({
            content: "Successfully reloaded all commands",
            ephemeral: true,
         });
      } catch (err) {
         term.red(err, "\n");
      }
   },
};
