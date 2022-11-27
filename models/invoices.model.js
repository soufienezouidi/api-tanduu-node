module.exports = (sequelize, Sequelize) => {
    const Invoices = sequelize.define("invoices", {
        sender: {
            type: Sequelize.JSON
        },
        reciever: {
            type: Sequelize.STRING
        },
        testing_sequelize: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Invoices;
};