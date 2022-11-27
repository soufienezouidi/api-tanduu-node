module.exports = (sequelize, Sequelize) => {
    const Badges = sequelize.define("badges", {

        name: {
            type: Sequelize.JSON
        },
        is_accepted: {
            type: Sequelize.BOOLEAN
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });

    return Badges;
};