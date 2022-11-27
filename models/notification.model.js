module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notification", {
        state: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.JSON
        },
        title: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        date_seen: {
            type: Sequelize.DATE
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });

    return Notification;
};