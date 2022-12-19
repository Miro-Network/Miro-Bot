const { Client, Message, ChannelType, EmbedBuilder } = require("discord.js");

module.exports = {
   name: "messageCreate",
   /**
    *
    * @param {Client} client
    * @param {Message} message
    */
   execute(message, client) {
      if (
         message.channel.type === ChannelType.DM ||
         !message.channel.viewable ||
         message.author.bot
      )
         return;

      if (
         message.content === `<@${client.user.id}>` ||
         message.content === `<@!${client.user.id}>`
      )
         return message.channel.send({
            embeds: [
               new EmbedBuilder()
                  .setTitle(`Hi, I'm ${client.user.username}. Need help?`)
                  .setThumbnail("https://i.imgur.com/SYY0WFC.jpg")
                  .setDescription(
                     "From 1/1/2022, you need to use slash commands instead of normal command.\nTo see all my command, do ``/`` on your text box 😺\n\n"
                  )
                  .addFields({
                     name: "Invite me",
                     value: `[Click here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot%20applications.commands&permissions=1099511627767) to invite me to your server right now!!`,
                  }),
            ],
         });
   },
};
