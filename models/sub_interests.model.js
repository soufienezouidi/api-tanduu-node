module.exports = (sequelize, Sequelize) => {
    const SubInterest = sequelize.define("sub_interests", {
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

    return SubInterest;
};