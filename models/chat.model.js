module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chat", {
        filename: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },

        user1: {
            type: Sequelize.INTEGER
        },
        user2: {
            type: Sequelize.INTEGER
        }
    });

    return Chat;
};