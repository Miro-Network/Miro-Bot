const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
} = require("discord.js");
let term = require("terminal-kit").terminal;
const client = require("../../main");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("play")
      .setDescription("Play a song/playlist")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addStringOption((option) =>
         option
            .setName("query")
            .setDescription("Provide a name/url for the song/playlist")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   execute(interaction) {
      const { options, member, channel } = interaction;

      const query = options.getString("query");
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

      try {
         client.distube.play(voiceChannel, query, {
            textChannel: channel,
            member: member,
         });
         return interaction.reply({
            content: "**🎵 Request received**",
         });
      } catch (err) {
         term.red(err);
      }
   },
};
