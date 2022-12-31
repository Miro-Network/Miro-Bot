const ascii = require("ascii-table");
const fs = require("node:fs");

function loadEvents(client) {
   const table = new ascii().setHeading("Events", "Status");

   const folders = fs.readdirSync("./src/events");
   for (const folder of folders) {
      const files = fs
         .readdirSync(`./src/events/${folder}`)
         .filter((file) => file.endsWith(".js"));

      for (const file of files) {
         const event = require(`../events/${folder}/${file}`);

         if (event.rest) {
            if (event.once)
               client.rest.once(event.name, (...args) =>
                  event.execute(...args, client)
               );
            else
               client.rest.on(event.name, (...args) =>
                  event.execute(...args, client)
               );
         } else if (event.custom) event.execute(client);
         else {
            if (event.once)
               client.once(event.name, (...args) =>
                  event.execute(...args, client)
               );
            else
               client.on(event.name, (...args) =>
                  event.execute(...args, client)
               );
         }
         table.addRow(file, "✅");
      }
   }
   return console.log(table.toString());
}

module.exports = { loadEvents };
