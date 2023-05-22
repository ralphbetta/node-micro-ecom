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
      }
    });


    // TODO Include Rating

  // This will ensure the beforeUpdate hook is registered
  //User.sync();

  return Product;

};