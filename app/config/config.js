require("dotenv").config();
module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  CORREOKEY: process.env.CORREOKEY,
  ACCOUNTSMS: process.env.ACCOUNTSMS,
  TOKENSMS: process.env.TOKENSMS,
  dialect: "mysql",
  dialectModule: require("mysql2"),
  // dialectOptions: {
  //   useUTC: false, //for reading from database
  //   options: {
  //     validateBulkLoadParameters: true, // or true, depending on your needs
  //   },
  // },
  timezone: "+00:00",
};

// en front hacer esto//

//para enviar de front a back

//const date = new Date(); // La fecha que quieres enviar
//const utcDate = date.toISOString(); // La fecha convertida a una cadena de texto en formato UTC

// para hacer en front cuando se recibe de back

//const date = new Date('2020-01-01T00:00:00Z'); // Esta es la fecha que recibes desde el backend
//const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
