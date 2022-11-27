module.exports = (sequelize, Sequelize) => {
    const Currencies = sequelize.define("currencies", {

        name: {
            type: Sequelize.STRING
        },
        code: {
            type: Sequelize.STRING
        },
        Symbol: {
            type: Sequelize.STRING
        },

    });

    return Currencies;
};