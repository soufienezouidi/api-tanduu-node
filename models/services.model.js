module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("service", {
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
    return Service;
};