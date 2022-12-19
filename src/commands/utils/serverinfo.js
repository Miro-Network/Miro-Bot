const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
   data: new SlashCommandBuilder()
      .setName("serverinfo")
      .setDescription("Return the server info")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      const { guild } = interaction;

      let owner = await interaction.guild.members.fetch(guild.ownerId);

      await interaction.deferReply();
      await wait(2000);

      interaction.editReply({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setTitle("Server Information")
               .setThumbnail(guild.iconURL())
               .setTimestamp()
               .addFields(
                  {
                     name: "Server Name",
                     value: `\`${guild.name}\``,
                     inline: true,
                  },
                  {
                     name: "Server ID",
                     value: `\`${guild.id}\``,
                     inline: true,
                  },
                  {
                     name: "Total Members",
                     value: `\`${guild.memberCount}\``,
                     inline: true,
                  },
                  {
                     name: "Owner",
                     value: `\`${owner.user.tag}\``,
                     inline: true,
                  },
                  {
                     name: "Created At",
                     value: `<t:${parseInt(
                        guild.createdTimestamp / 1000
                     )}:R>`,
                     inline: true,
                  },
                  {
                     name: "Role Count",
                     value: `\`${guild.roles.cache.size}\``,
                     inline: true,
                  },
                  {
                     name: "Channel Count",
                     value: `\`${guild.channels.cache.size}\``,
                     inline: true,
                  },
                  {
                     name: "Emoji Count",
                     value: `\`${guild.emojis.cache.size}\``,
                     inline: true,
                  },
                  {
                     name: "Boost Count",
                     value: `\`${guild.premiumSubscriptionCount || "0"}\``,
                     inline: true,
                  }
               ),
         ],
      });
   },
};
