module.exports = (sequelize, Sequelize) => {
    const Sub_category = sequelize.define("sub_category", {
        name: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        is_accepted: {
            type: Sequelize.BOOLEAN
        },
        languages: {
            type: Sequelize.JSON
        },
        most_relevent: {
            type: Sequelize.INTEGER
        },
        suggestedBy: {
            type: Sequelize.INTEGER
        }

    });

    return Sub_category;
};