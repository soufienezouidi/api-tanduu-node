module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING
        },
        code: {
            type: Sequelize.STRING
        },
        expiredAt: {
            type: Sequelize.DATE
        },
        avatar: {
            type: Sequelize.STRING
        },
        cover: {
            type: Sequelize.STRING
        },
        is_active: {
            type: Sequelize.BOOLEAN
        },
        is_completed: {
            type: Sequelize.BOOLEAN
        },
        location: {
            type: Sequelize.JSON,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING
        },
        verified: {
            type: Sequelize.BOOLEAN
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        last_login: {
            type: Sequelize.DATE
        },
        inner_role: {
            type: Sequelize.JSON,
            allowNull: true
        },
        device_id: {
            type: Sequelize.STRING
        },
        session_key: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        account_number: {
            type: Sequelize.STRING
        },
        personal_email: {
            type: Sequelize.STRING
        },
        code_phone: {
            type: Sequelize.STRING
        },
        code_mobile: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        birthday: {
            type: Sequelize.STRING
        },
        interests: {
            type: Sequelize.JSON,
            allowNull: true
        },
        user_link: {
            type: Sequelize.STRING
        },
        position_cover: {
            type: Sequelize.JSON
        },
        position_profile: {
            type: Sequelize.JSON
        }
    });

    return User;
};