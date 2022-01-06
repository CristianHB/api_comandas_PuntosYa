module.exports = (app) => {
  const delivery = require("../controllers/delivery.controller");

  var router = require("express").Router();

  // Create a new Delivery
  router.post("/create", delivery.create);

  // Retrieve all Delivery
  router.post("/read", delivery.findAll);

  // Retrieve all published Delivery
  // router.get("/actived", delivery.findAllActived);

  // Retrieve a single Delivery with id
  router.get("/readOne/:id", delivery.findOne);

  // Update a Delivery with id
  router.post("/update/:id", delivery.update);

  // Delete a Delivery with id
  router.post("/delete", delivery.delete);

  // Delete all deliverys
  // router.delete("/", delivery.deleteAll);

  app.use("/api/domicilio", router);
};
