module.exports = (sequelize, Sequelize) => {
    const Gallery = sequelize.define("galleries", {
        catalog_name:  {
            type: Sequelize.STRING
        },
        catalog_link:  {
            type: Sequelize.TEXT
        },
        galleries:  {
            type: Sequelize.JSON
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });
    return Gallery;
};