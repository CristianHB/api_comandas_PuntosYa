const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.couriers = require("./courier.model.js")(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);
db.deliveries = require("./delivery.model.js")(sequelize, Sequelize);
db.commands = require("./command.model.js")(sequelize, Sequelize);
db.paymentGateways = require("./paymentGateway.model.js")(sequelize, Sequelize);
db.paymentMethods = require("./paymentMethod.model.js")(sequelize, Sequelize);
db.tip = require("./tip.model.js")(sequelize, Sequelize);

module.exports = db;
