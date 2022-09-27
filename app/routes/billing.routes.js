module.exports = (app) => {
  const Billing = require("../controllers/billing.controller");

  var router = require("express").Router();

  // Create a new Billing
  router.post("/create", Billing.create);

  // Retrieve all Billing
  router.post("/read", Billing.findAll);

  // Retrieve all published Billing
  // router.get("/actived", Billing.findAllActived);

  // Retrieve a single Billing with id
  //   router.get("/readOne/:id", Billing.findOne);

  // Update a Billing with id
  router.post("/update/:tienda", Billing.update);

  // Delete a Billing with id
  //   router.post("/delete", Billing.delete);

  // Delete all Tips
  // router.delete("/", Billing.deleteAll);

  app.use("/api/facturacion", router);
};
