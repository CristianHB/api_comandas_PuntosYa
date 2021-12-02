require("dotenv").config();
module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: "mssql",
  dialectOptions: {
    useUTC: false, //for reading from database
  },
  timezone: "+05:30",
};
