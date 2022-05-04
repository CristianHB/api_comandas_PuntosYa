const dbConfig = require("../config/config.js");
const twilio = require("twilio");

exports.sendMessage = async (req, res) => {
  console.log(dbConfig.ACCOUNTSMS);
  const client = new twilio(dbConfig.ACCOUNTSMS, dbConfig.TOKENSMS);
  client.messages
    .create({
      //numero de prueba
      // to: "+573186178799",
      to: `+57${req.body.telefono}`,
      body: `
Compra en ${req.body.nombreCompany}, por valor de ${req.body.monto}. 
      
Puntos Pendientes: ${
        req.body.puntosPendientes ? req.body.puntosPendientes.toFixed(2) : 0
      }
Puntos Disponibles: ${
        req.body.puntosSinCobrar ? req.body.puntosSinCobrar.toFixed(2) : 0
      }
      `,
      from: "+19564520925",
    })
    .then((message) => {
      res.send({ message: "mensaje enviado" });
      console.log(message);
    })
    .done();
};
