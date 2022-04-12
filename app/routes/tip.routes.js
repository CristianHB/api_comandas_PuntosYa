module.exports = (app) => {
  const Tip = require("../controllers/tip.controller");

  var router = require("express").Router();

  // Create a new Tip
  router.post("/create", Tip.create);

  // Retrieve all Tip
  router.post("/read", Tip.findAll);

  // Retrieve all published Tip
  // router.get("/actived", Tip.findAllActived);

  // Retrieve a single Tip with id
  //   router.get("/readOne/:id", Tip.findOne);

  // Update a Tip with id
  router.post("/update/:tienda", Tip.update);

  // Delete a Tip with id
  //   router.post("/delete", Tip.delete);

  // Delete all Tips
  // router.delete("/", Tip.deleteAll);

  app.use("/api/propina", router);
};
