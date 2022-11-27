module.exports = (sequelize, Sequelize) => {
    const Commercial = sequelize.define("commercial", {
        code: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        phone: {
            type: Sequelize.STRING
        },
        provision_in: {
            type: Sequelize.DECIMAL
        },
        provision_out: {
            type: Sequelize.DECIMAL
        },
        password: {
            type: Sequelize.STRING
        },

    });

    return Commercial;
};