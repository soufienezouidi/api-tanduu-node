module.exports = (sequelize, Sequelize) => {
    const ReportSubCategories = sequelize.define("report_sub_categories", {
        name: {
            type: Sequelize.JSON
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });

    return ReportSubCategories;
};