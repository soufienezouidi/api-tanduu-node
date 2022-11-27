module.exports = (sequelize, Sequelize) => {
    const RecievedOrder = sequelize.define("received_orders", {
        status: {
            type: Sequelize.STRING
        },
        invoice_sent: {
            type: Sequelize.BOOLEAN
        },
        leadfee: {
            type: Sequelize.INTEGER
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        declined_reason: {
            type: Sequelize.TEXT
        },
        notes: {
            type: Sequelize.JSON
        },
        By_customer: {
            type: Sequelize.BOOLEAN

        }

    });
    return RecievedOrder;
};