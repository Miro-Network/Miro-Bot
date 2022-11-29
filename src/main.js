const {
   Client,
   GatewayIntentBits,
   Partials,
   Collection,
} = require("discord.js");
const { loadEvents } = require("./handlers/events");
const { loadCommands } = require("./handlers/commands");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({
   allowedMentions: { parse: ["users", "roles"], repliedUser: true },
   intents: [Guilds, GuildMembers, GuildMessages],
   partials: [User, Message, GuildMember, ThreadMember, Channel],
});

client.commands = new Collection();

client.config = require("./config");

client.login(client.config.token).then(() => {
   loadEvents(client);
   loadCommands(client);
});
