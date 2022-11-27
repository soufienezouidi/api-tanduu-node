module.exports = (sequelize, Sequelize) => {
    const Class_accounting = sequelize.define("class_accounting", {
        class_name: {
            type: Sequelize.STRING
        },
        class_number: {
            type: Sequelize.INTEGER
        },
        account: {
            type: Sequelize.STRING
        },
        cashout: {
            type: Sequelize.BOOLEAN
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });

    return Class_accounting;
};