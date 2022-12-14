const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("userinfo")
      .setDescription("Return the user info")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addUserOption((option) =>
         option
            .setName("user")
            .setDescription("The user you want to view the info")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const { options } = interaction;

      const user = options.getUser("user");
      const member = await interaction.guild.members.cache.get(user.id);

      await interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
               .setThumbnail(user.displayAvatarURL())
               .addFields(
                  {
                     name: "路 Name:",
                     value: `馃牃 *${user.username}*`,
                     inline: false,
                  },
                  {
                     name: "路 ID:",
                     value: `馃牃 *${user.id}*`,
                  },
                  {
                     name: "路 Roles:",
                     value: `馃牃 ${member.roles.cache.map((r) => r).join(` `)}`,
                     inline: false,
                  },
                  {
                     name: "路 Created At:",
                     value: `馃牃 <t:${parseInt(member.user.createdAt / 1000)}:f>`,
                     inline: true,
                  },
                  {
                     name: "路 Joined At:",
                     value: `馃牃 <t:${parseInt(member.joinedAt / 1000)}:f>`,
                     inline: true,
                  }
               )
               .setTimestamp(),
         ],
      });
   },
};
