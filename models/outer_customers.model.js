module.exports = (sequelize, Sequelize) => {
    const OuterCustomer = sequelize.define("outer_custmers", {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.JSON
        },
        civil_status: {
            type: Sequelize.STRING
        },

    });

    return OuterCustomer;
};