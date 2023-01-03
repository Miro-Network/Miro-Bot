const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
} = require("discord.js");
let term = require("terminal-kit").terminal;

module.exports = {
   data: new SlashCommandBuilder()
      .setName("restart")
      .setDescription("Restart the bot (dev only)")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addStringOption((option) =>
         option
            .setName("password")
            .setDescription("Type the password to restart")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      const { user, options } = interaction;
      const password = options.getString("password");

      if (user.id !== "695449735343112259")
         return interaction.reply({
            content: "You need to be developer to use this command",
            ephemeral: true,
         });

      if (password !== client.config.bot.password)
         return interaction.reply({
            content: "The password is incorrect. Try again",
            ephemeral: true,
         });

      try {
         await interaction.client.destroy();
         await interaction.client.login(client.config.bot.token);
         await term.yellow(`> [CLIENT] | Restart requested by ${user.tag}\n`);
         interaction.reply({
            content: "Successfully restarted",
            ephemeral: true,
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
