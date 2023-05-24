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

const Product = db.product = require("../product.model")(sequelize, Sequelize);
const Order = db.accesstokens = require("../order.model")(sequelize, Sequelize);
const Payment = db.accesstokens = require("../payment.model")(sequelize, Sequelize);
const User  = db.user = require("../user.model")(sequelize, Sequelize);
const Rating = db.rating = require("../rating.model")(sequelize, Sequelize);

//order
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });
Order.hasMany(Product);

// Product
Product.hasMany(Rating, { foreignKey: 'productId' });
Product.belongsTo(Order, { foreignKey: 'productId' });
Rating.belongsTo(Product, { foreignKey: 'productId'});

User.hasMany(Rating, {foreignKey: 'userId'});
Rating.belongsTo(User);



module.exports = {db, Product, Order, Payment, User, Rating };
