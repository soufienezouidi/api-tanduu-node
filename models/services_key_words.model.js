module.exports = (sequelize, Sequelize) => {
    const ServicesKeyWords = sequelize.define("services_keywords", {
        keywords: {
            type: Sequelize.JSON
        }
    });

    return ServicesKeyWords;
};