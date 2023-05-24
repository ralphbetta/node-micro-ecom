const { Product } = require("./database");



module.exports = (sequelize, DataTypes) => {

  const Order = sequelize.define('Order', {
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    products: {
      type: DataTypes.JSON,
      allowNull: false
    },
  });
  
  // This will ensure the beforeUpdate hook is registered
  //User.sync();

  return Order;

};