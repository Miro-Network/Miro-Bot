const { Client, GatewayIntentBits, Partials } = require("discord.js");
var term = require("terminal-kit").terminal;

const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Channel } = Partials;

const client = new Client({
   allowedMentions: { parse: ["users", "roles"], repliedUser: true },
   intents: [Guilds, GuildMembers, GuildMessages],
   partials: [User, Message, GuildMember, ThreadMember, Channel],
});

client.once("ready", () => {
   term.cyan(`> [CLIENT] | Logged in as ${client.user.tag}`);
});

client.config = require("./config");

client.login(client.config.token);
