const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("nuke")
      .setDescription("Nuke a channel")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      await interaction.channel.clone().then((channel) => {
         channel
            .setPosition(interaction.channel.position)
            .then(interaction.channel.delete());

         channel.send(`Nuked by \`${interaction.user.tag}\``);
      });
   },
};
