module.exports = (sequelize, Sequelize) => {
    const Suggested_category = sequelize.define("suggested_cateogry", {
        name: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        is_accepted: {
            type: Sequelize.BOOLEAN
        },
        suggestions: {
            type: Sequelize.JSON
        },
        requesterId: {
            type: Sequelize.INTEGER
        },
        locationId: {
            type: Sequelize.INTEGER
        }

    });
    return Suggested_category;
};
