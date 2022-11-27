module.exports = (sequelize, Sequelize) => {
    const Report = sequelize.define("report", {
        type_report: {
            type: Sequelize.STRING
        },
        other_reason: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        subCategory: {
            type: Sequelize.STRING
        },
    });

    return Report;
};