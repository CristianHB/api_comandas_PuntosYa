const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // dialectOptions: dbConfig.dialectOptions,
});
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.commands = require("./command.model.js")(sequelize, Sequelize);
db.color = require("./color.model.js")(sequelize, Sequelize);
db.couriers = require("./courier.model.js")(sequelize, Sequelize);
db.deliveries = require("./delivery.model.js")(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);
db.paymentGateways = require("./paymentGateway.model.js")(sequelize, Sequelize);
db.paymentMethods = require("./paymentMethod.model.js")(sequelize, Sequelize);
db.tip = require("./tip.model.js")(sequelize, Sequelize);
db.gmt = require("./gmt.model.js")(sequelize, Sequelize);
db.billing = require("./billing.model.js")(sequelize, Sequelize);

module.exports = db;
