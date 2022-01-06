module.exports = (app) => {
  const paymentMethod = require("../controllers/paymentMethod.controller");

  var router = require("express").Router();

  // Create a new Payment Method
  //   router.post("/create", paymentMethod.create);

  // Retrieve all Payment Method
  router.post("/read", paymentMethod.findAll);

  // Retrieve all published Payment Method
  // router.get("/actived", paymentMethod.findAllActived);

  // Retrieve a single Payment Method with id
  //   router.get("/readOne/:id", paymentMethod.findOne);

  // Update a Payment Method with id
  router.post("/update/:id", paymentMethod.update);

  // Delete a Payment Method with id
  //   router.post("/delete", paymentMethod.delete);

  // Delete all Payment Methods
  // router.delete("/", paymentMethod.deleteAll);

  app.use("/api/metodos_pago", router);
};
