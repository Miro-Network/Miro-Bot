const fs = require("node:fs");
let term = require("terminal-kit").terminal;

module.exports = (client) => {
   if (client.giveawayConfig.giveawayManager.privateMessageInformation) {
      fs.readdirSync("./giveaway").forEach(async (dir) => {
         const events = fs.readdirSync(`./giveaway/${dir}/${file}`);

         for (const file of events) {
            const event = require(`${__dirname}/../events/giveaway/${dir}/${file}`);
            if (event.name) {
               term.cyan(
                  `> [GIVEAWAY MANAGER] | Loaded ${file.split(".")[0]} events\n`
               );

               client.giveawaysManager.on(event.name, (...args) =>
                  event.execute(...args, client)
               );
               delete require.cache[
                  require.resolve(
                     `${__dirname}/../events/giveaway/${dir}/${file}`
                  )
               ];
            } else {
               term.red(
                  `> [GIVEAWAY MANAGER] | Failed to load ${
                     file.split(".")[0]
                  }\n`
               );
               continue;
            }
         }
      });
   } else {
      term.yellow(
         "> [GIVEAWAY MANAGER] | Warning: Private Message Information is disabled\n"
      );
   }
};
