module.exports = (app) => {
  const paymentGateway = require("../controllers/paymentGateway.controller");

  var router = require("express").Router();

  // Create a new PaymentGateway
  router.post("/create", paymentGateway.create);

  // Retrieve all PaymentGateway
  router.post("/read", paymentGateway.findAll);

  // Retrieve all published PaymentGateway
  // router.get("/actived", paymentGateway.findAllActived);

  // Retrieve a single PaymentGateway with id
  //   router.get("/readOne/:id", paymentGateway.findOne);

  // Update a PaymentGateway with id
  router.post("/update", paymentGateway.update);

  // Delete a PaymentGateway with id
  router.post("/delete", paymentGateway.delete);

  // Delete all PaymentGateways
  // router.delete("/", paymentGateway.deleteAll);

  app.use("/api/pasarela_pago", router);
};
