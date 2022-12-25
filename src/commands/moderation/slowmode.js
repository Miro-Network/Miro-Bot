const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   EmbedBuilder,
} = require("discord.js");
const ms = require("ms");
let term = require("terminal-kit").terminal;

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
   async execute(interaction) {
      const { options } = interaction;
      const time = options.getString("time");

      const millisecond = ms(time);
      if (isNaN(millisecond))
         return interaction.reply({
            content: "This is not a valid time",
            ephemeral: true,
         });

      try {
         if (time === "0s" || time === "0") {
            await interaction.channel.setRateLimitPerUser(0);
            return interaction.reply({
               embeds: [
                  new EmbedBuilder()
                     .setColor("Aqua")
                     .setDescription(`**Successfully turn off the slowmode**`)

                     .setTimestamp(),
               ],
            });
         }

         if (time.startsWith("-") && time.endsWith("s")) {
            i = Math.abs(time.slice(0, -1));

            await interaction.channel.setRateLimitPerUser(i);
            return interaction.reply({
               embeds: [
                  new EmbedBuilder()
                     .setColor("Aqua")
                     .setDescription(
                        `**Successfully set the slowmode for this channel to \`${i}s\`**`
                     )
                     .setTimestamp(),
               ],
            });
         }

         if (!time.endsWith("s") && !time.startsWith("-")) {
            await interaction.channel.setRateLimitPerUser(ms(time));
            return interaction.reply({
               embeds: [
                  new EmbedBuilder()
                     .setColor("Aqua")
                     .setDescription(
                        `**Successfully set the slowmode for this channel to \`${time}s\`**`
                     )
                     .setTimestamp(),
               ],
            });
         }

         if (!time.endsWith("s") && time.startsWith("-")) {
            k = Math.abs(time);

            await interaction.channel.setRateLimitPerUser(k);
            return interaction.reply({
               embeds: [
                  new EmbedBuilder()
                     .setColor("Aqua")
                     .setDescription(
                        `**Successfully set the slowmode for this channel to \`${k}s\`**`
                     )
                     .setTimestamp(),
               ],
            });
         }

         await interaction.channel.setRateLimitPerUser(millisecond / 1000);
         return interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("Aqua")
                  .setDescription(
                     `**Successfully set the slowmode for this channel to \`${time}\`**`
                  )
                  .setTimestamp(),
            ],
         });
      } catch (err) {
         interaction.reply({
            content:
               "There was a problem when executing this command. Please try again later",
            ephemeral: true,
         });
         term.red(err, "\n");
      }
   },
};
