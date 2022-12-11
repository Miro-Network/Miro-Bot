const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("status")
      .setDescription("Return the bot status")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   execute(interaction, client) {
      interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setDescription(
                  `**Client:** \`🟢 ONLINE\` - \`${
                     client.ws.ping
                  }ms\`\n**Uptime:** <t:${parseInt(
                     client.readyTimestamp / 1000
                  )}:R>`
               ),
         ],
      });
   },
};
