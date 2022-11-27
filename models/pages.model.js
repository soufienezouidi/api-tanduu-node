module.exports = (sequelize, Sequelize) => {
    const Page = sequelize.define("page", {
        name: {
            type: Sequelize.STRING
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

    return Page;
};