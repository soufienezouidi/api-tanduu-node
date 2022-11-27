module.exports = (sequelize, Sequelize) => {
    const SavedCollections = sequelize.define("saved_collections", {
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return SavedCollections;
};