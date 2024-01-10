require("dotenv").config();
module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  CORREOKEY: process.env.CORREOKEY,
  ACCOUNTSMS: process.env.ACCOUNTSMS,
  TOKENSMS: process.env.TOKENSMS,
  dialect: "mssql",
  dialectOptions: {
    useUTC: false, //for reading from database
    options: {
      validateBulkLoadParameters: true, // or true, depending on your needs
    },
  },
  timezone: "+05:30",
};
