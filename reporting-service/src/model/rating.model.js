

const model = require('../model/database/index');

module.exports = (sequelize, DataTypes) => {
  

    const Rating = sequelize.define('Rating', {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
    

    


    // Rating.associate = (models) => {
    //     Rating.belongsTo(models.Product, {
    //       foreignKey: {
    //         allowNull: false,
    //       },
    //     });
    //     Rating.belongsTo(models.User, {
    //       foreignKey: {
    //         allowNull: false,
    //       },
    //     });
    //   };

    //
    //Rating.sync();

    return Rating;

};


