require("dotenv").config();

module.exports = {
   bot: {
      token: process.env.TOKEN,
      clientId: process.env.CLIENT_ID,
      password: process.env.PASSWORD,
   },
   db: {
      mongoDB: process.env.MONGO_URL,
   },
   web: {
      port: process.env.PORT || 3000,
   },
};
