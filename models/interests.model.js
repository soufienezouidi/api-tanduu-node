module.exports = (sequelize, Sequelize) => {
    const Interest = sequelize.define("interests", {
        name: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        description: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        is_accepted: {
            type: Sequelize.BOOLEAN
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
    });

    return Interest;
};