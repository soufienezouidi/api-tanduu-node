module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("Customer", {

        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.JSON
        },
        Phones: {
            type: Sequelize.JSON
        },
        Emails: {
            type: Sequelize.JSON
        },
        gender: {
            type: Sequelize.STRING
        },
        date_of_birth: {
            type: Sequelize.DATE
        }

    });

    return Customer;
};