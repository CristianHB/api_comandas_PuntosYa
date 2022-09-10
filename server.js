require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to comanda's PuntosYa API node application." });
});

require("./app/routes/color.routes")(app);
require("./app/routes/command.routes")(app);
require("./app/routes/courier.routes")(app);
require("./app/routes/delivery.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/paymentGateway.routes")(app);
require("./app/routes/paymentMethod.routes")(app);
require("./app/routes/tip.routes")(app);
require("./app/routes/msm.routes")(app);
require("./app/routes/gmt.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  // console.log(`Server ready on http://localhost:${PORT}.`);
});
