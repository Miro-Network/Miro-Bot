function loadClient() {
   const {
      Client,
      GatewayIntentBits,
      Partials,
      Collection,
   } = require("discord.js");

   const { loadEvents } = require("./handlers/events");
   const { loadCommands } = require("./handlers/commands");

   const client = new Client({
      allowedMentions: { parse: ["users", "roles"], repliedUser: true },
      intents: [
         GatewayIntentBits.Guilds,
         GatewayIntentBits.GuildMembers,
         GatewayIntentBits.GuildBans,
         GatewayIntentBits.GuildMessages,
         GatewayIntentBits.GuildMessageReactions,
         GatewayIntentBits.DirectMessages,
         GatewayIntentBits.DirectMessageReactions,
      ],
      partials: [Object.keys(Partials)],
   });

   client.commands = new Collection();
   client.config = require("./config");

   return client.login(client.config.bot.token).then(() => {
      loadEvents(client);
      loadCommands(client);
   });
}

module.exports = { loadClient };
