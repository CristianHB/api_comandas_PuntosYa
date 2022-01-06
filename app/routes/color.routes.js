module.exports = (app) => {
  const Color = require("../controllers/color.controller");

  var router = require("express").Router();

  // Create a new Color
  //   router.post("/create", Color.create);

  // Retrieve all Color
  //   router.get("/read", Color.findAll);

  // Retrieve all published Color
  // router.get("/actived", Color.findAllActived);

  //   Retrieve a single Color with id
  router.get("/readOne/:tienda", Color.findOne);

  // Update a Color with id
  router.post("/update/:tienda", Color.update);

  // Delete a Color with id
  //   router.post("/delete", Color.delete);

  // Delete all Colors
  // router.delete("/", Color.deleteAll);

  app.use("/api/color", router);
};
