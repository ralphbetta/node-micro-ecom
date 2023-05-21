
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    // Define the User model
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
            unique: true
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
    },
        {
            hooks: {
                beforeCreate: async (user) => {
                    console.log("hello");
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    user.password = hashedPassword;
                },
                beforeUpdate: async (user) => {

                    if (user.changed('password')) {
                        const hashedPassword = await bcrypt.hash(user.password, 10);
                        user.password = hashedPassword;
                    }
                },
            },
            scopes: {
                findAll: {
                    attributes: { exclude: ['password'] },
                },
            },
        }

    );

    User.beforeSave((user) => {
        // Perform any required actions before updating the user
    });

    // This will ensure the beforeUpdate hook is registered
    User.sync();

    return User;

};