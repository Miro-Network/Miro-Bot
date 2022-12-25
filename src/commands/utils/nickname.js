const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("nickname")
      .setDescription("Change your own nickname")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addStringOption((option) =>
         option
            .setName("nickname")
            .setDescription("The new nickname you want to set")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      const { options, user } = interaction;

      const nickname = options.getString("nickname");
      const member = interaction.guild.members.fetch(user.id);

      try {
         (await member).setNickname(nickname);
         interaction.reply({
            content: "Successfully changed your nickname",
            ephemeral: true,
         });
      } catch (err) {
         interaction.reply({
            content:
               "There was a problem when executing this command. Please try again later",
            ephemeral: true,
         });
      }
   },
};
