module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("article", {
        group_name: {
            type: Sequelize.STRING
        },
        articles: {
            type: Sequelize.JSON
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
    });

    return Article;
};