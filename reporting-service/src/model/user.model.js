
const model = require('../model/database/index');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: { msg: "It must be a valid Email address" },
            }
        },
        password: {
            type: Sequelize.STRING,
        },
        is_approved: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        account_type: {
            type: Sequelize.STRING,
            defaultValue: 'user'
        },
        image: {
            type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        token: {
            type: Sequelize.STRING,
        }
    });

    // This will ensure the beforeUpdate hook is registered
    User.sync();

    return User;

};