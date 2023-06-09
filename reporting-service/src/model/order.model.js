

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


  // Define the association between Order and Product
  // Order.belongsToMany(Product, { through: 'OrderProducts' });
  // Product.belongsToMany(Order, { through: 'OrderProducts' });

  // This will ensure the beforeUpdate hook is registered
  //User.sync();

  return Order;

};