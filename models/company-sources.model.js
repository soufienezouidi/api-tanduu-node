module.exports = (sequelize, Sequelize) => {
    const Company_sources = sequelize.define("company_sources", {
        company_id: {
            type: Sequelize.INTEGER
        },
        source_list: {
            type: Sequelize.JSON
        },

        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });

    return Company_sources;
};