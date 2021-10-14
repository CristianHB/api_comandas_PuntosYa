module.exports = (app) => {
  const courier = require("../controllers/courier.controller");

  var router = require("express").Router();

  // Create a new Courier
  router.post("/create", courier.create);

  // Retrieve all Courier
  router.get("/read", courier.findAll);

  // Retrieve all published Courier
  // router.get("/actived", courier.findAllActived);

  // Retrieve a single Courier with id
  router.get("/readOne/:id", courier.findOne);

  // Update a Courier with id
  router.post("/update/:id", courier.update);

  // Delete a Courier with id
  router.post("/delete", courier.delete);

  // Delete all couriers
  // router.delete("/", courier.deleteAll);

  app.use("/api/mensajero", router);
};
