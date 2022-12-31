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
      intents: [Object.keys(GatewayIntentBits)],
      partials: [Object.keys(Partials)],
   });

   client.commands = new Collection();
   client.config = require("./config");

   return client.login(client.config.token).then(() => {
      loadEvents(client);
      loadCommands(client);
   });
}

module.exports = { loadClient };
