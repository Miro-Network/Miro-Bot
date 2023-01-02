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
                     name: "· Name:",
                     value: `🠚 *${user.username}*`,
                     inline: false,
                  },
                  {
                     name: "· ID:",
                     value: `🠚 *${user.id}*`,
                  },
                  {
                     name: "· Roles:",
                     value: `🠚 ${member.roles.cache.map((r) => r).join(` `)}`,
                     inline: false,
                  },
                  {
                     name: "· Created At:",
                     value: `🠚 <t:${parseInt(member.user.createdAt / 1000)}:f>`,
                     inline: true,
                  },
                  {
                     name: "· Joined At:",
                     value: `🠚 <t:${parseInt(member.joinedAt / 1000)}:f>`,
                     inline: true,
                  }
               )
               .setTimestamp(),
         ],
      });
   },
};
