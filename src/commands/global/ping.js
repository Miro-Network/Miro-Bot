const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Return the bot ping")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   execute(interaction, client) {
      interaction.reply({
         content: `🏓 Pong! About \`${client.ws.ping}ms\``,
      });
   },
};
