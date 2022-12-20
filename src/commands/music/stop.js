const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
} = require("discord.js");
const client = require("../../main");
let term = require("terminal-kit").terminal;

module.exports = {
   data: new SlashCommandBuilder()
      .setName("stop")
      .setDescription("Stop the queue")
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
         await queue.stop(voiceChannel);
         interaction.reply("⏹️ The queue has been stopped");
      } catch (err) {
         term.red(err);
      }
   },
};
