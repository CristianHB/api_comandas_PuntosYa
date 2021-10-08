module.exports = (app) => {
  const command = require("../controllers/command.controller");

  var router = require("express").Router();

  // Create a new User
  router.post("/create", command.create);

  // Retrieve all Users
  router.get("/read", command.findAll);

  // Retrieve all published Users
  // router.get("/actived", users.findAllActived);

  // Retrieve a single User with id
  router.get("/readOne/:id", command.findOne);

  // Update a User with id
  router.post("/update/:id", command.update);

  // Delete a User with id
  router.post("/delete", command.delete);

  // Delete all commands
  // router.delete("/", command.deleteAll);

  app.use("/api/command", router);
};
