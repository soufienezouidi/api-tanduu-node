module.exports = (sequelize, Sequelize) => {
    const Branches = sequelize.define("branches", {

        company: {
            type: Sequelize.STRING
        },
        company_mail: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        branche_name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        is_enabled: {
            type: Sequelize.BOOLEAN
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });

    return Branches;
};