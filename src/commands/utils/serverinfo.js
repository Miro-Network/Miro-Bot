const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   ChannelType,
   EmbedBuilder,
   GuildExplicitContentFilter,
   GuildNSFWLevel,
   GuildVerificationLevel,
} = require("discord.js");
let term = require("terminal-kit").terminal;

module.exports = {
   data: new SlashCommandBuilder()
      .setName("serverinfo")
      .setDescription("Return the server info")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const { guild } = interaction;

      const sortedRoles = guild.roles.cache
         .map((r) => r)
         .slice(1, guild.roles.cache.size)
         .sort((a, b) => b.position - a.position);
      const userRoles = sortedRoles.filter((r) => !r.managed);
      const manageRoles = sortedRoles.filter((r) => r.managed);

      await guild.members.fetch();
      const botCount = guild.members.cache.filter((m) => m.user.bot).size;

      const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
         let totalLength = 0;
         const result = [];

         for (const role of roles) {
            const roleString = `<@&${role.id}>`;

            if (roleString.length + totalLength > maxFieldLength) break;

            totalLength += roleString.length + 1;
            result.push(roleString);
         }

         return result.length;
      };

      const splitPascal = (str, separator) =>
         str.split(/(?=[A-U])/).join(separator);

      const getChannelTypeSize = (type) =>
         guild.channels.cache.filter((c) => type.includes(c.type)).size;
      const totalChannel = getChannelTypeSize([
         ChannelType.GuildText,
         ChannelType.GuildAnnouncement,
         ChannelType.GuildVoice,
         ChannelType.GuildStageVoice,
         ChannelType.GuildForum,
         ChannelType.GuildCategory,
      ]);

      let owner = await guild.fetchOwner();

      try {
         interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("Aqua")
                  .setTitle(`${guild.name}'s information`)
                  .setThumbnail(guild.iconURL({ size: 1024 }))
                  .addFields(
                     {
                        name: "· Description:",
                        value: `🠚 *${guild.description || "None"}*`,
                     },
                     {
                        name: "· General:",
                        value: [
                           `🠚 *ID: ${guild.id}*`,
                           `🠚 *Owner: <@${owner.id}>*`,
                           `🠚 *Created At:* <t:${parseInt(
                              guild.createdTimestamp / 1000
                           )}:f>`,
                           `🠚 *Language: ${new Intl.DisplayNames(["en"], {
                              type: "language",
                           }).of(guild.preferredLocale)}*`,
                           `🠚 *Vanity URL: ${guild.vanityURLCode || "None"}*`,
                        ].join("\n"),
                     },
                     {
                        name: "· Security:",
                        value: [
                           `🠚 *Explicit Filter: ${splitPascal(
                              GuildExplicitContentFilter[
                                 guild.explicitContentFilter
                              ],
                              " "
                           )}*`,
                           `🠚 *NSFW Level: ${splitPascal(
                              GuildNSFWLevel[guild.nsfwLevel],
                              " "
                           )}*`,
                           `🠚 *Verification Level: ${splitPascal(
                              GuildVerificationLevel[guild.verificationLevel],
                              ""
                           )}*`,
                        ].join("\n"),
                        inline: true,
                     },
                     {
                        name: `· Member (${guild.memberCount}):`,
                        value: [
                           `🠚 *Users: ${guild.memberCount - botCount}*`,
                           `🠚 *Bots: ${botCount}*`,
                        ].join("\n"),
                        inline: true,
                     },
                     {
                        name: `· User roles:`,
                        value: `${
                           userRoles
                              .slice(0, maxDisplayRoles(userRoles))
                              .join(" ") || "None"
                        }`,
                     },
                     {
                        name: `· Bot roles:`,
                        value: `${
                           manageRoles
                              .slice(0, maxDisplayRoles(manageRoles))
                              .join(" ") || "None"
                        }`,
                     },
                     {
                        name: `· Channel (${totalChannel}):`,
                        value: [
                           `🠚 *Text channels: ${getChannelTypeSize([
                              ChannelType.GuildText,
                              ChannelType.GuildForum,
                              ChannelType.GuildAnnouncement,
                           ])}*`,
                           `🠚 *Voice channels: ${getChannelTypeSize([
                              ChannelType.GuildVoice,
                              ChannelType.GuildStageVoice,
                           ])}*`,
                           `🠚 *Categories: ${getChannelTypeSize([
                              ChannelType.GuildCategory,
                           ])}*`,
                        ].join("\n"),
                        inline: true,
                     },
                     {
                        name: `· Emoji & Sticker (${
                           guild.emojis.cache.size + guild.stickers.cache.size
                        }):`,
                        value: [
                           `🠚 *Animated: ${
                              guild.emojis.cache.filter((e) => e.animated).size
                           }*`,
                           `🠚 *Static: ${
                              guild.emojis.cache.filter((e) => !e.animated).size
                           }*`,
                           `🠚 *Sticker: ${guild.stickers.cache.size}*`,
                        ].join("\n"),
                        inline: true,
                     },
                     {
                        name: "· Nitro:",
                        value: [
                           `🠚 *Level: ${guild.premiumTier}*`,
                           `🠚 *Boost count: ${guild.premiumSubscriptionCount}*`,
                           `🠚 *Boosters: ${
                              guild.members.cache.filter(
                                 (m) => m.roles.premiumSubscriberRole
                              ).size
                           }*`,
                        ].join("\n"),
                        inline: true,
                     },
                     {
                        name: "· Banner:",
                        value: guild.bannerURL() ? " " : "🠚 *None*",
                     }
                  )
                  .setTimestamp(),
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
