const { EmbedBuilder } = require("discord.js");
const client = require("../../main");

let term = require("terminal-kit").terminal;

client.distube
   .on("playSong", (queue, song) =>
      queue.textChannel.send({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setDescription(
                  `🎶 | **Started playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}**`
               ),
         ],
      })
   )
   .on("addSong", (queue, song) =>
      queue.textChannel.send({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setDescription(
                  `🎶 | **Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by** ${song.user}`
               ),
         ],
      })
   )
   .on("addList", (queue, playlist) =>
      queue.textChannel.send({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setDescription(
                  `🎶 | **Added \`${playlist.name}\` playlist (\`${playlist.songs.length} songs\`) to queue`
               ),
         ],
      })
   )
   .on("error", (channel, e) => {
      if (channel) {
         channel.send(`⛔ | **An error has occurred. Please try again later**`);
         term.red(e, "\n");
      } else term.red(e, "\n");
   })
   .on("empty", (channel) =>
      channel.send({
         embeds: [
            new EmbedBuilder()
               .setColor("Red")
               .setDescription(
                  "⛔ | **Voice channel is empty! Leaving the channel...**"
               ),
         ],
      })
   )
   .on("searchNoResult", (message, query) =>
      message.channel.send({
         embeds: [
            new EmbedBuilder()
               .setColor("Red")
               .setDescription("`⛔ | **No result found for `${query}`!**`"),
         ],
      })
   )
   .on("finish", (queue) =>
      queue.textChannel.send({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setDescription("🏁 | **Queue finished!**"),
         ],
      })
   );
