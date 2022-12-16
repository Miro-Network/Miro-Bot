const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("avatar")
      .setDescription("Display the avatar of the user")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addUserOption((option) =>
         option
            .setName("user")
            .setDescription("The user you want to view the avatar")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   execute(interaction) {
      const { options } = interaction;

      const user = options.getUser("user");

      interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setAuthor({
                  name: `${user.tag}`,
                  iconURL: `${user.displayAvatarURL()}`,
               })
               .setColor("Aqua")
               .setDescription(`[Avatar URL](${user.displayAvatarURL()})`)
               .setImage(
                  user.displayAvatarURL({ size: 2048, extension: "png" })
               )
               .setTimestamp(),
         ],
      });
   },
};
