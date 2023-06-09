const enviromentalConfig = require('../../config/db.config');
const dbConfig = enviromentalConfig.development;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Product = db.users = require("../product.model")(sequelize, Sequelize);
const Order = db.accesstokens = require("../order.model")(sequelize, Sequelize);
const Payment = db.accesstokens = require("../payment.model")(sequelize, Sequelize);

module.exports = {db, Product, Order, Payment };
