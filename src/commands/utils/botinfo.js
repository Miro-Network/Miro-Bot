const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   EmbedBuilder,
} = require("discord.js");
const cpustat = require("cpu-stat");
const os = require("node:os");
const wait = require("node:timers/promises").setTimeout;

var term = require("terminal-kit").terminal;

const { formatBytes } = require("../../functions/formatBytes");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("botinfo")
      .setDescription("Return the bot info")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   execute(interaction, client) {
      cpustat.usagePercent(async function (err, percent) {
         if (err) term.red(err, "\n");

         await interaction.deferReply();
         await wait(1000);
         await interaction.editReply({
            embeds: [
               new EmbedBuilder()
                  .setColor("Aqua")
                  .setTitle("Bot Info")
                  .setThumbnail(
                     client.user.displayAvatarURL({ extension: "png" })
                  )
                  .setDescription(
                     `***• GENERAL INFO***\n**- Name:**  \`${
                        client.user.tag
                     }\`\n**- ID:**  \`${
                        client.user.id
                     }\`\n**- Created At:**  <t:${parseInt(
                        client.user.createdAt / 1000
                     )}:R>\n**- Uptime:**  <t:${parseInt(
                        client.readyTimestamp / 1000
                     )}:R>\n\n***• TECHNICAL INFO***\n**- Total CPU Cores:**  \`${
                        os.cpus().length
                     } core(s)\`\n**- CPU Usage:**  \`${percent.toFixed(
                        2
                     )}%\`\n**- RAM Usage:**  \`${formatBytes(
                        process.memoryUsage().heapUsed
                     )}\`\n\n**• PROGRAMING ENVIRONMENT**\n**- Node version:**  \`${
                        process.version
                     }\``
                  ),
            ],
         });
      });
   },
};
