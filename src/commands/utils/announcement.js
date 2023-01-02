const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   EmbedBuilder,
   ChannelType,
} = require("discord.js");
let term = require("terminal-kit").terminal;

module.exports = {
   data: new SlashCommandBuilder()
      .setName("announcement")
      .setDescription("Send the announcement to channel")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
      .addChannelOption((option) =>
         option
            .setName("channel")
            .setDescription("The channel you want to send the announcement")
            .setRequired(true)
      )
      .addStringOption((option) =>
         option
            .setName("content")
            .setDescription("The content of the announcement")
            .setRequired(true)
      )
      .addRoleOption((option) =>
         option
            .setName("role")
            .setDescription("The role you want to mention (optional)")
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      const { options } = interaction;

      const channel = options.getChannel("channel");
      const content = options.getString("content");
      const role = options.getRole("role");

      if (channel.type !== ChannelType.GuildText)
         return interaction.reply({
            content: "Please specify a text channel",
            ephemeral: true,
         });

      try {
         if (role) {
            await channel.send({
               content: `-> ${role}`,
            });
            await channel.send({
               embeds: [
                  new EmbedBuilder()
                     .setColor("Aqua")
                     .setTitle("📢 Announcement")
                     .setDescription(`${content}`)
                     .setFooter({
                        text: `Announcement from ${interaction.user.tag}`,
                     })
                     .setTimestamp(),
               ],
            });
            return interaction.reply({
               content: `Successfully send the announcement to ${channel}`,
               ephemeral: true,
            });
         } else {
            await channel.send({
               embeds: [
                  new EmbedBuilder()
                     .setColor("Aqua")
                     .setTitle("📢 New Announcement")
                     .setDescription(`${content}`)
                     .setFooter({
                        text: `Announcement from ${interaction.user.tag}`,
                     })
                     .setTimestamp(),
               ],
            });
            return interaction.reply({
               content: `Successfully send the announcement to ${channel}`,
               ephemeral: true,
            });
         }
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
