require("dotenv").config();

module.exports = {
   token: process.env.TOKEN,
   clientId: process.env.CLIENT_ID,
   mongoDB: process.env.MONGO_URL,
   port: process.env.PORT || 3000,
};
