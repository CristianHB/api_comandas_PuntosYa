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
db.commands = require("./command.model.js")(sequelize, Sequelize);

module.exports = db;
