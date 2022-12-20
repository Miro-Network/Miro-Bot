const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");
const client = require("../../main");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("queue")
      .setDescription("Display the current query")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const { member } = interaction;

      const voiceChannel = member.voice.channel;
      if (!voiceChannel)
         return interaction.reply({
            content: "You must be in the voice channel to use this command",
            ephemeral: true,
         });

      if (
         interaction.guild.members.me.voice.channelId !==
         interaction.member.voice.channelId
      )
         return interaction.reply({
            content: "You need to be on the same voice channel as the bot",
         });

      const queue = await client.distube.getQueue(voiceChannel);
      if (!queue) return interaction.reply("There is no active queue");

      interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setDescription(
                  `${queue.songs.map(
                     (song, id) =>
                        `\n**${id + 1}. \`${song.name}\` - \`${
                           song.formattedDuration
                        }\`**`
                  )}`
               ),
         ],
      });
   },
};
