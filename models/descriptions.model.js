module.exports = (sequelize, Sequelize) => {
    const Descriptions = sequelize.define("description", {
        category_id: {
            type: Sequelize.INTEGER
        },
        en: {
            type: Sequelize.TEXT
        },
        fr: {
            type: Sequelize.TEXT
        },
        de: {
            type: Sequelize.TEXT
        }
    });

    return Descriptions;
};