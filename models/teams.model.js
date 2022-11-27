module.exports = (sequelize, Sequelize) => {
    const Teams = sequelize.define("teams", {
        members: {
            type: Sequelize.JSON
        },

    });

    return Teams;
};