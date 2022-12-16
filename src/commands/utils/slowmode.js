const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   EmbedBuilder,
} = require("discord.js");
const ms = require("ms");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("slowmode")
      .setDescription("Return the bot status")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
      .addStringOption((option) =>
         option
            .setName("time")
            .setDescription("Provide a time (1s, 2m, 3h,...)")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   execute(interaction) {
      const { options } = interaction;
      const time = options.getString("time");

      const millisecond = ms(time);
      if (isNaN(millisecond))
         return interaction.reply({
            content: "This is not a valid time",
            ephemeral: true,
         });

      if (time === "0s") {
         interaction.channel.setRateLimitPerUser(0);
         return interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("Aqua")
                  .setDescription(
                     `Successfully set the slowmode for this channel to \`0s\``
                  ),
            ],
         });
      }

      if (time.startsWith("-") && time.endsWith("s")) {
         i = Math.abs(time.slice(0, -1));

         interaction.channel.setRateLimitPerUser(i);
         return interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("Aqua")
                  .setDescription(
                     `Successfully set the slowmode for this channel to \`${i}s\``
                  ),
            ],
         });
      }

      interaction.channel.setRateLimitPerUser(millisecond / 1000);
      return interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setDescription(
                  `**Successfully set the slowmode for this channel to \`${time}\`**`
               ),
         ],
      });
   },
};
