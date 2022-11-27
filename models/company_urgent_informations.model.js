module.exports = (sequelize, Sequelize) => {
    const Company_urgent_informations = sequelize.define("company_urgent_informations", {
        informations: {
            type: Sequelize.JSON
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });
    return Company_urgent_informations;
};