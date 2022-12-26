const {
   Client,
   GatewayIntentBits,
   Partials,
   Collection,
} = require("discord.js");
const express = require("express");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { loadEvents } = require("./handlers/events");
const { loadCommands } = require("./handlers/commands");
let term = require("terminal-kit").terminal;

const client = new Client({
   allowedMentions: { parse: ["users", "roles"], repliedUser: true },
   intents: [Object.keys(GatewayIntentBits)],
   partials: [Object.keys(Partials)],
});

const app = express();

client.commands = new Collection();
client.distube = new DisTube(client, {
   emitNewSongOnly: true,
   emitAddSongWhenCreatingQueue: false,
   joinNewVoiceChannel: false,
   plugins: [new SpotifyPlugin()],
});

client.config = require("./config");

const encodedToken = Buffer.from(client.config.token, "base64");
const decodedToken = encodedToken.toString("utf-8");

client.login(decodedToken).then(() => {
   loadEvents(client);
   loadCommands(client);

   app.get("/", (req, res) => res.send("Online!"));
   app.listen(client.config.port, () =>
      term.cyan(`> [WEB] | Listening on http://localhost:${client.config.port}\n`)
   );
});

module.exports = client;
