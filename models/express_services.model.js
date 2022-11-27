module.exports = (sequelize, Sequelize) => {
    const Express_services = sequelize.define("express_services", {
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
        }
    });

    return Express_services;
};