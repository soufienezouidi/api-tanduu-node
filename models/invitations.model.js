module.exports = (sequelize, Sequelize) => {
    const Invitation = sequelize.define("invitations", {
        invitation_token: {
            type: Sequelize.STRING
        },
        code_key: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        is_accepted: {
            type: Sequelize.BOOLEAN
        },
        is_refused: {
            type: Sequelize.BOOLEAN
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        role: {
            type: Sequelize.STRING
        }
    });
    return Invitation;
};