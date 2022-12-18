const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   VoiceChannel,
   GuildEmoji,
   EmbedBuilder,
} = require("discord.js");
const client = require("../../main");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("music")
      .setDescription("Play and control music")
      .addSubcommand((subcommand) =>
         subcommand
            .setName("play")
            .setDescription("Play a song/playlist")
            .addStringOption((option) =>
               option
                  .setName("query")
                  .setDescription("Provide a name/url for the song/playlist")
                  .setRequired(true)
            )
      )
      .addSubcommand((subcommand) =>
         subcommand
            .setName("volume")
            .setDescription("Adjust the song/playlist volume")
            .addNumberOption((option) =>
               option
                  .setName("percent")
                  .setDescription("The volume you want to change (1 - 100)")
                  .setMinValue(1)
                  .setMaxValue(100)
                  .setRequired(true)
            )
      )
      .addSubcommand((subcommand) =>
         subcommand
            .setName("options")
            .setDescription("Select an option")
            .addStringOption((option) =>
               option
                  .setName("options")
                  .setDescription("Select an option")
                  .setRequired(true)
                  .addChoices(
                     { name: "queue", value: "queue" },
                     { name: "skip", value: "skip" },
                     { name: "pause", value: "pause" },
                     { name: "resume", value: "resume" },
                     { name: "stop", value: "stop" }
                  )
            )
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const { options, member, guild, channel } = interaction;

      const subcommand = options.getSubcommand();
      const query = options.getString("query");
      const volume = options.getNumber("percent");
      const option = options.getString("options");
      const voiceChannel = member.voice.channel;

      if (!voiceChannel)
         return interaction.reply({
            content: "You must be in the voice channel to use this command",
            ephemeral: true,
         });

      if (!member.voice.channelId == guild.members.me.voice.channelId)
         return interaction.reply({
            content: `You can't use the music player as it is already active in <#${guild.members.me.voice.channelId}>`,
            ephemeral: true,
         });

      try {
         switch (subcommand) {
            case "play":
               client.distube.play(voiceChannel, query, {
                  textChannel: channel,
                  member: member,
               });
               return interaction.reply({
                  content: "🎵 Request received",
                  ephemeral: true,
               });
            case "volume":
               client.distube.setVolume(voiceChannel, volume);
               return interaction.reply(`🔈Volume has been set to ${volume}%`);
            case "settings":
               const queue = await client.distube.getQueue(voiceChannel);

               if (!queue) return interaction.reply("There is no active queue");

               switch (option) {
                  case "queue":
                     interaction.reply({
                        embeds: [
                           new EmbedBuilder()
                              .setColor("Aqua")
                              .setDescription(
                                 `${queue.song.map(
                                    (song, id) =>
                                       `\n**${id + 1}.** ${song.name} - \`${
                                          song.formattedDuration
                                       }\``
                                 )}`
                              ),
                        ],
                     });
                  case "skip":
                     await queue.skip(voiceChannel);
                     return interaction.reply("⏭️ The song has been skipped");
                  case "stop":
                     await queue.stop(voiceChannel);
                     return interaction.reply("⏹️ The queue has been stopped");
                  case "pause":
                     await queue.pause(voiceChannel);
                     return interaction.reply("⏸️ The queue has been paused");
                  case "resume":
                     await queue.resume(voiceChannel);
                     return interaction.reply("▶️ The queue has been resumed");
                  case "stop":
                     await queue.stop(voiceChannel);
               }
         }
      } catch (err) {
         console.error(err);
      }
   },
};
