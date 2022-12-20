const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
} = require("discord.js");
const client = require("../../main");
let term = require("terminal-kit").terminal;

module.exports = {
   data: new SlashCommandBuilder()
      .setName("volume")
      .setDescription("Adjust the song/playlist volume")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addNumberOption((option) =>
         option
            .setName("percent")
            .setDescription("The volume you want to change (1 - 100)")
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   execute(interaction) {
      const { options, member } = interaction;

      const percent = options.getNumber("percent");
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
         client.distube.setVolume(voiceChannel, percent);
         interaction.reply(`**🔈Volume has been set to \`${percent}%\`**`);
      } catch (err) {
         term.red(err);
      }
   },
};
