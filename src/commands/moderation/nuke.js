const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("nuke")
      .setDescription("Nuke a channel")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      await interaction.channel.clone().then((channel) => {
         channel
            .setPosition(interaction.channel.position)
            .then(interaction.channel.delete());

         channel.send(`Nuked by \`${interaction.user.tag}\``);
      });
   },
};
