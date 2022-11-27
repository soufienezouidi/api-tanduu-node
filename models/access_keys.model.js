module.exports = (sequelize, Sequelize) => {
    const Access_tokens = sequelize.define(" access_tokens", {
        code: {
            type: Sequelize.STRING
        },

        privilege: {
            type: Sequelize.JSON
        },
        is_active: {
            type: Sequelize.BOOLEAN
        }

    });

    return Access_tokens;
};