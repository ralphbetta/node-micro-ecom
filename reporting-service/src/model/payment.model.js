

module.exports = (sequelize, DataTypes) => {

  const Payment = sequelize.define('Payment', {
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    }
  }, {
    timestamps: true
  });
  
  // Define the association between Payment and Order
  Payment.belongsTo(Order, { foreignKey: 'orderId' });
  Order.hasOne(Payment, { foreignKey: 'orderId' });

  // This will ensure the beforeUpdate hook is registered
  //User.sync();

  return Order;

};