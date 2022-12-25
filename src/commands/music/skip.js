const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
} = require("discord.js");
const client = require("../../main");
let term = require("terminal-kit").terminal;

module.exports = {
   data: new SlashCommandBuilder()
      .setName("skip")
      .setDescription("Skip the current song")
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

      try {
         if (queue.songs.length <= 1)
            return interaction.reply({
               content: "There is no up next song",
            });

         await queue.skip(voiceChannel);
         interaction.reply("⏭️ The song has been skipped");
      } catch (err) {
         term.red(err);
      }
   },
};