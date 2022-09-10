module.exports = (app) => {
    const Gmt = require("../controllers/gmt.controller");
    var router = require("express").Router();

    // Create a new Gmt
    router.post("/create", Gmt.create);
    // Retrieve all Gmt
    router.post("/read", Gmt.findAll);
  
    // Retrieve all published Gmt
    // router.get("/actived", Gmt.findAllActived);
  
    // Retrieve a single Gmt with id
    //   router.get("/readOne/:id", Gmt.findOne);
  
    // Update a Gmt with id
    router.post("/update/:tienda", Gmt.update);
  
    // Delete a Gmt with id
    // router.post("/delete", Gmt.delete);
  
    // Delete all Gmt
    // router.delete("/", Gmt.deleteAll);
  
    app.use("/api/gmt", router);
  };
  