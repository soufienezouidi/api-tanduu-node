module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        verified: {
            type: Sequelize.BOOLEAN
        },
        Last_login: {
            type: Sequelize.DATE
        },
        is_completed: {
            type: Sequelize.BOOLEAN,
        },
        is_active: {
            type: Sequelize.BOOLEAN,
        },
        inner_role: {
            type: Sequelize.JSON
        },
        device_id: {
            type: Sequelize.STRING
        },
        First_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        Session_key: {
            type: Sequelize.STRING
        },
        personal_email: {
            type: Sequelize.STRING
        }
    });

    return User;
};