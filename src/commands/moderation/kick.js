const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   EmbedBuilder,
   ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("kick")
      .setDescription("Kick a user")
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
      .addUserOption((option) =>
         option
            .setName("target")
            .setDescription("User to be kicked")
            .setRequired(true)
      )
      .addStringOption((option) =>
         option.setName("reason").setDescription("Reason for the kick")
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const { options } = interaction;

      const user = options.getUser("target");
      const reason = options.getString("reason") || "No reason provided";

      const member = await interaction.guild.members.fetch(user.id);

      if (
         member.roles.highest.position >=
         interaction.member.roles.highest.position
      )
         return interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("Red")
                  .setDescription(
                     `**You can't take action on \`${user.tag}\` since they have a higher role**`
                  ),
            ],
            ephemeral: true,
         });

      await member.kick(reason);
      await interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setTitle("💥 Moderation Execution")
               .setDescription(`**Successfully kicked \`${user.tag}\`**`)
               .setThumbnail(user.displayAvatarURL({ extension: "png" }))
               .addFields({
                  name: "Reason:",
                  value: `\`${reason}\``,
                  inline: true,
               })
               .setTimestamp(),
         ],
      });
   },
};
