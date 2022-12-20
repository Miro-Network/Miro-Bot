const { GiveawaysManager } = require("discord-giveaways");
const giveawayModel = require("../utils/giveawaysManager");

module.exports = (client) => {
   const GAManager = class extends GiveawaysManager {
      async getAllGiveaways() {
         return await giveawayModel.find().lean().exec();
      }

      async saveGiveaway(messageId, giveawayData) {
         await giveawayModel.create(giveawayData);
         return true;
      }

      async editGiveaway(messageId, giveawayData) {
         await giveawayModel
            .updateOne({ messageId }, giveawayData, {
               omitUndefined: true,
            })
            .exec();
         return true;
      }

      async deleteGiveaway(messageId, giveawayData) {
         await giveawayModel.delete({ messageId }).exec();
         return true;
      }
   };

   const manager = new GAManager(client, {
      default: {
         botsCanWin: false,
         embedColor: "#00FFFF",
         embedColorEnd: "#F00000",
         reaction: client.giveawayConfig.giveawayManager.reaction,
      },
   });
   client.giveawaysManager = manager;
};
