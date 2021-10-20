module.exports = (app) => {
  const paymentMethod = require("../controllers/paymentMethod.controller");

  var router = require("express").Router();

  // Create a new PaymentGateway
  //   router.post("/create", paymentMethod.create);

  // Retrieve all PaymentGateway
  router.get("/read", paymentMethod.findAll);

  // Retrieve all published PaymentGateway
  // router.get("/actived", paymentMethod.findAllActived);

  // Retrieve a single PaymentGateway with id
  //   router.get("/readOne/:id", paymentMethod.findOne);

  // Update a PaymentGateway with id
  // router.post("/update/:id", paymentMethod.update);

  // Delete a PaymentGateway with id
  //   router.post("/delete", paymentMethod.delete);

  // Delete all PaymentGateways
  // router.delete("/", paymentMethod.deleteAll);

  app.use("/api/metodos_pago", router);
};
