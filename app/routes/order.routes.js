module.exports = (app) => {
  const order = require("../controllers/order.controller");

  var router = require("express").Router();

  // Create a new Order
  router.post("/create", order.create);

  // Retrieve all Orders
  router.post("/read", order.findAll);

  // test email
  router.post("/test", order.test);

  // test msm
  router.post("/testmsm", order.testmsm);

  // Retrieve all published Orders
  // router.get("/actived", Order.findAllActived);

  // Retrieve a single Order with id
  router.get("/readOne/:codigo", order.findOne);

  //Retrieve a list of Orders
  router.post("/readByStatus", order.findByStatus);

  // Update a Order with id
  router.post("/update/:id", order.update);

  // Delete a Order with id
  router.post("/delete", order.delete);

  // Delete all orders
  // router.delete("/", order.deleteAll);

  //read Orders by time
  router.post("/readOrdersByTime", order.totalOrdersByTime);

  //read Payed Orders by time
  router.post("/readPayedOrdersByTime", order.totalPayedOrdersByTime);

  //Find Orders month
  router.post("/readAllOrdersMonth", order.totalOrdersMonth);

  //Find Orders By Payment method
  router.post("/readOrdersByPaymentMethod", order.totalOrdersByPaymentMethod);

  app.use("/api/pedido", router);
};
