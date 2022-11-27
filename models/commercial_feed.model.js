module.exports = (sequelize, Sequelize) => {
    const Commercial_feed = sequelize.define("commercial_feed", {

        client: {
            type: Sequelize.JSON
        },
        income: {
            type: Sequelize.INTEGER
        },

    });

    return Commercial_feed;
};