module.exports = (app) => {
  const Msm = require("../controllers/msm.controller");

  var router = require("express").Router();

  // Send message
  router.post("/send", Msm.sendMessage);

  app.use("/api/msm", router);
};
