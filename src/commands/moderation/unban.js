const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("unban")
      .setDescription("Unban a user")
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
      .addStringOption((option) =>
         option
            .setName("id")
            .setDescription("Discord ID of the user you want to unban")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const { options } = interaction;

      const userID = options.getInteger("id");

      try {
         if (!isNaN(userID))
            return interaction.reply({
               embeds: [
                  new EmbedBuilder()
                     .setColor("Red")
                     .setDescription("**Please enter an correct ID**"),
               ],
               ephemeral: true,
            });

         interaction.guild.bans.fetch().then((ban) => {
            let banUser = ban.find((b) => b.user.id == userID);
            if (!banUser)
               return interaction.reply({
                  embeds: [
                     new EmbedBuilder()
                        .setColor("Red")
                        .setDescription(
                           "**User not found in banishment list**"
                        ),
                  ],
                  ephemeral: true,
               });
         });

         await interaction.guild.members.unban(userID);
         await interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("Aqua")
                  .setDescription(
                     `**Successfully unbanned ID: \`${userID}\` from the guild**`
                  )
                  .setTimestamp()
                  .setFooter(`Action by ${interaction.user.tag}`),
            ],
         });
      } catch (err) {
         console.error(err);
      }
   },
};
