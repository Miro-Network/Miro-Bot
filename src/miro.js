const {
   Client,
   GatewayIntentBits,
   Partials,
   Collection,
} = require("discord.js");
const express = require("express");

const { loadEvents } = require("./handlers/events");
const { loadCommands } = require("./handlers/commands");

let term = require("terminal-kit").terminal;

const client = new Client({
   allowedMentions: { parse: ["users", "roles"], repliedUser: true },
   intents: [Object.keys(GatewayIntentBits)],
   partials: [Object.keys(Partials)],
});

client.commands = new Collection();
client.config = require("./config");

client.login(client.config.token).then(() => {
   loadEvents(client);
   loadCommands(client);
});

module.exports = client;
