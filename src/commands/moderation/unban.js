const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");
let term = require("terminal-kit").terminal;

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

      const userID = options.getString("id");

      try {
         if (!isNaN(userID))
            return interaction.reply({
               content: "Please enter an correct ID",
               ephemeral: true,
            });

         interaction.guild.bans.fetch().then((ban) => {
            let banUser = ban.find((b) => b.user.id == userID);
            if (!banUser)
               return interaction.reply({
                  content: "User not found in banishment list",
                  ephemeral: true,
               });
         });

         await interaction.guild.members.unban(userID);
         await interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("Aqua")
                  .setDescription(
                     `Successfully unbanned ID: \`${userID}\` from the guild`
                  )
                  .setTimestamp()
                  .setFooter(`Action by ${interaction.user.tag}`),
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
