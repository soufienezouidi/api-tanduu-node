module.exports = (sequelize, Sequelize) => {
    const Keywords = sequelize.define("keywords", {
        type: {
            type: Sequelize.STRING
        },
        list_words: {
            type: Sequelize.JSON
        },
        referenceId: {
            type: Sequelize.INTEGER
        },
        object: {
            type: Sequelize.JSON
        },

    });

    return Keywords;
};