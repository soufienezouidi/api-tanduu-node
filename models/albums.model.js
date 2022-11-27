module.exports = (sequelize, Sequelize) => {
    const Albums = sequelize.define("albums", {
        name: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN

        },
        is_created_by_user: {
            type: Sequelize.BOOLEAN
        }
    });
    return Albums;
};