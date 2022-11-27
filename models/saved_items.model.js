module.exports = (sequelize, Sequelize) => {
    const SavedItems = sequelize.define("saved_items", {
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        link: {
            type: Sequelize.STRING
        }
    });

    return SavedItems;
};