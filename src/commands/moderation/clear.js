const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");
let term = require("terminal-kit").terminal;

module.exports = {
   data: new SlashCommandBuilder()
      .setName("clear")
      .setDescription("Clear a specific amount of messages")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
      .addIntegerOption((option) =>
         option
            .setName("amount")
            .setDescription("Amount of messages")
            .setRequired(true)
      )
      .addUserOption((option) =>
         option
            .setName("target")
            .setDescription("Select a target to clear their messages")
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const { channel, options } = interaction;

      const amount = options.getInteger("amount");
      const target = options.getUser("target");

      if (amount === 0)
         return interaction.reply({
            content: "You can't delete 0 message",
            ephemeral: true,
         });

      const messages = await channel.messages.fetch({
         limit: amount,
      });

      const res = new EmbedBuilder().setColor("Aqua");

      try {
         if (target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
               if (msg.author.id === target.id && amount > i) {
                  filtered.push(msg);
                  i++;
               }
            });

            await channel.bulkDelete(filtered).then((messages) => {
               res.setDescription(
                  `**Successfully deleted \`${messages.size} message(s)\` from** ${target}`
               ).setTimestamp();
               interaction.reply({
                  embeds: [res],
               });
            });
         } else {
            await channel.bulkDelete(amount, true).then((messages) => {
               res.setDescription(
                  `**Successfully deleted \`${messages.size} message(s)\` from the channel**`
               ).setTimestamp();
               interaction.reply({
                  embeds: [res],
               });
            });
         }
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
