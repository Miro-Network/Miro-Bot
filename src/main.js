const {
   Client,
   GatewayIntentBits,
   Partials,
   Collection,
} = require("discord.js");
const { loadEvents } = require("./handlers/events");
const { loadCommands } = require("./handlers/commands");
const { loadErrors } = require("./handlers/errors");

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({
   allowedMentions: { parse: ["users", "roles"], repliedUser: true },
   intents: [Guilds, GuildMembers, GuildMessages],
   partials: [User, Message, GuildMember, ThreadMember, Channel],
});

client.commands = new Collection();

client.config = require("./config");

const encodedToken = Buffer.from(client.config.token, "base64");
const decodedToken = encodedToken.toString("utf-8");

client.login(decodedToken).then(() => {
   loadEvents(client);
   loadCommands(client);
   loadErrors();
});
