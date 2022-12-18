const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("addrole")
      .setDescription("Adds a role to a user")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
      .addUserOption((option) =>
         option
            .setName("user")
            .setDescription("The user you want to give a role to")
            .setRequired(true)
      )
      .addRoleOption((option) =>
         option
            .setName("role")
            .setDescription("The role you want to give")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const { options } = interaction;

      const user = options.getUser("user");
      const role = options.getRole("role");
      const member = await interaction.guild.members.fetch(user.id);

      if (
         member.roles.highest.position >=
         interaction.member.roles.highest.position
      )
         return interaction.reply({
            content: `You can't take action on \`${user.tag}\` since they have a higher role`,
            ephemeral: true,
         });

      if (member.roles.cache.has(role.id))
         return interaction.reply({
            content: `\`${member.user.username}\` already has that role`,
            ephemeral: true,
         });

      await member.roles.add(role);
      interaction.reply({
         content: `**Successfully added \`@${role.name}\` to \`${member.user.name}\``,
      });
   },
};
