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
      let totalSec = client.uptime / 1000;

      let days = Math.floor(totalSec / 86400);
      totalSec %= 86400;
      let hours = Math.floor(totalSec / 3600);
      totalSec %= 3600;
      let minutes = Math.floor(totalSec / 60);
      let seconds = Math.floor(totalSec % 60);

      let uptime = `\`${days} day(s), ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)\``;

      interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setDescription(
                  `**Client:** \`🟢 ONLINE\` - \`${client.ws.ping}ms\`\n**Uptime:** ${uptime}`
               ),
         ],
      });
   },
};
