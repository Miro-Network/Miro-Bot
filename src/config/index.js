require("dotenv").config();

module.exports = {
   token: process.env.TOKEN,
   mongoDB: process.env.MONGO_URL,
   port: 3000,
};
