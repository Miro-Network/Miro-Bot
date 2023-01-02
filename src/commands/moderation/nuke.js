const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
} = require("discord.js");
let term = require("terminal-kit").terminal;

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
      const { channel } = interaction;

      try {
         await channel.clone().then((channel) => {
            channel
               .setPosition(interaction.channel.position)
               .then(interaction.channel.delete());

            channel.send(`**Nuked by \`${interaction.user.tag}\`**`);
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
