module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
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
        },
        description_en: {
            type: Sequelize.TEXT
        },
        description_fr: {
            type: Sequelize.TEXT
        },
        description_de: {
            type: Sequelize.TEXT
        },
        category_link: {
            type: Sequelize.STRING
        }
    });

    return Category;
};
