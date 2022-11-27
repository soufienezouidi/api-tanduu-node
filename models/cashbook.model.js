module.exports = (sequelize, Sequelize) => {
    const Cashbook = sequelize.define("cashbook", {

        description: {
            type: Sequelize.STRING,
        },
        in: {
            type: Sequelize.DOUBLE
        },
        out: {
            type: Sequelize.DOUBLE
        },
        tva: {
            type: Sequelize.DECIMAL,
        },
        solde: {
            type: Sequelize.DOUBLE
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        index: {
            type: Sequelize.INTEGER
        },
        timbre_fiscal: {
            type: Sequelize.DOUBLE
        },
        timbre_carte: {
            type: Sequelize.DOUBLE
        },
        net: {
            type: Sequelize.DOUBLE
        },
        brutte: {
            type: Sequelize.DOUBLE
        },
        invoices: {
            type: Sequelize.JSON
        }
    }
    )
        ;

    return Cashbook;
}
    ;
