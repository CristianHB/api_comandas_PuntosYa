module.exports = (app) => {
  const courier = require("../controllers/courier.controller");

  var router = require("express").Router();

  // Create a new User
  router.post("/create", courier.create);

  // Retrieve all Users
  router.get("/read", courier.findAll);

  // Retrieve all published Users
  // router.get("/actived", users.findAllActived);

  // Retrieve a single User with id
  router.get("/readOne/:id", courier.findOne);

  // Update a User with id
  router.post("/update/:id", courier.update);

  // Delete a User with id
  router.post("/delete", courier.delete);

  // Delete all couriers
  // router.delete("/", courier.deleteAll);

  app.use("/api/courier", router);
};
