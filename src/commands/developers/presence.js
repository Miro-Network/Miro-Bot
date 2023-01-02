const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   ActivityType,
} = require("discord.js");
let term = require("terminal-kit").terminal;

module.exports = {
   data: new SlashCommandBuilder()
      .setName("presence")
      .setDescription("Change the bot presence (dev only)")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addStringOption((option) =>
         option
            .setName("activity")
            .setDescription("The activity you want to set")
            .setRequired(true)
            .addChoices(
               { name: "Playing", value: "Playing" },
               { name: "Streaming", value: "Streaming" },
               { name: "Listening", value: "Listening" },
               { name: "Watching", value: "Watching" },
               { name: "Competing", value: "Competing" }
            )
      )
      .addStringOption((option) =>
         option
            .setName("activityname")
            .setDescription("The activity name you want to set")
            .setRequired(true)
      )
      .addStringOption((option) =>
         option
            .setName("status")
            .setDescription("The status you want to set")
            .setRequired(true)
            .addChoices(
               { name: "Online", value: "Online" },
               { name: "Idle", value: "Idle" },
               { name: "Do Not Disturb", value: "DND" },
               { name: "Invisible", value: "Invisible" }
            )
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      const { options, user } = interaction;
      const activity = options.getString("activity");
      const activityName = options.getString("activityname");
      const status = options.getString("status");

      if (user.id !== "695449735343112259")
         return interaction.reply({
            content: "You need to be developer to use this command",
            ephemeral: true,
         });
      try {
         switch (activity) {
            case "Playing":
               client.user.setActivity(activityName, {
                  type: ActivityType.Playing,
               });
               break;
            case "Streaming":
               client.user.setActivity(activityName, {
                  type: ActivityType.Streaming,
                  url: "https://www.twitch.tv/nocopyrightsounds",
               });
               break;
            case "Listening":
               client.user.setActivity(activityName, {
                  type: ActivityType.Listening,
               });
               break;
            case "Watching":
               client.user.setActivity(activityName, {
                  type: ActivityType.Watching,
               });
               break;
            case "Competing":
               client.user.setActivity(activityName, {
                  type: ActivityType.Competing,
               });
               break;
         }
         switch (status) {
            case "Online":
               client.user.setPresence({ status: "online" });
               break;
            case "Idle":
               client.user.setPresence({ status: "idle" });
               break;
            case "DND":
               client.user.setPresence({ status: "dnd" });
               break;
            case "Invisible":
               client.user.setPresence({ status: "invisible" });
         }

         interaction.reply({
            content: "Successfully changed the presence",
            ephemeral: true,
         });

         term.yellow(
            `> [CLIENT] | Presence update:\n- Activity type: ${activity}\n- Activity name: ${activityName}\n- Status: ${status}\n`
         );
      } catch (err) {
         term.red(err, "\n");
      }
   },
};
