module.exports = (sequelize, Sequelize) => {
    const ReportCategories = sequelize.define("report_categories", {
        name: {
            type: Sequelize.JSON
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });

    return ReportCategories;
};