
const {Order} = require('./database/index');

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
    },

    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
  
    timestamps: true
  });
  

  // This will ensure the beforeUpdate hook is registered
  //User.sync();

  return Order;

};