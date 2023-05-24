const model = require('../model/database/index');
const Rating = require('../model/rating.model');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },

  });



  // This will ensure the beforeUpdate hook is registered
  //User.sync();

  return Product;

};