module.exports = (sequelize, Sequelize) => {
    const Orders_service = sequelize.define("orders_service", {
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });
    return Orders_service;
};