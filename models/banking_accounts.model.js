module.exports = (sequelize, Sequelize) => {
    const BankingAccounts = sequelize.define("banking_accounts", {

        account_owner: {
            type: Sequelize.STRING
        },
        bank_name: {
            type: Sequelize.STRING
        },
        iban: {
            type: Sequelize.STRING
        },
        swift_bic: {
            type: Sequelize.STRING
        },
        rib: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
    });
    return BankingAccounts;
};