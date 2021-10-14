module.exports = (app) => {
  const command = require("../controllers/command.controller");

  var router = require("express").Router();

  // Create a new Commands
  router.post("/create", command.create);

  // Retrieve all Commands
  router.get("/read", command.findAll);

  // Retrieve all published Commands
  // router.get("/actived", command.findAllActived);

  // Retrieve a single Commands with id
  router.get("/readOne/:codigo", command.findOne);

  //Retrieve a list of Commands
  router.get("/readByStatus/:status", command.findByStatus);

  // Update a Commands with id
  router.post("/update/:id", command.update);

  // Delete a Commands with id
  router.post("/delete", command.delete);

  // Group Commands with id
  router.post("/group", command.group);

  app.use("/api/comanda", router);
};
