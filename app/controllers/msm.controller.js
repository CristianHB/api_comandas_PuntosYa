require("dotenv").config();
const twilio = require("twilio");

exports.sendMessage = async (req, res) => {
  const client = new twilio(process.env.ACCOUNTSMS, process.env.TOKENSMS);
  client.messages
    .create({
      to: "+573186178799",
      // to: `+57${req.body.telefono}`,
      body: `Compra en ${req.body.nombreCompany}, por valor de ${req.body.monto}. 
            Puntos Pendientes: ${req.body.puntosPendientes}
            Puntos Disponibles: ${req.body.puntosSinCobrar}`,
      from: "+19564520925",
    })
    .then((message) => {
      res.send({ message: "mensaje enviado" });
      console.log(message);
    })
    .done();
};
