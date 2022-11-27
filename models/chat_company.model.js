module.exports = (sequelize, Sequelize) => {
    const Chat_Company = sequelize.define("chat_company", {
        filename: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },

        id_company: {
            type: Sequelize.INTEGER
        },
        chattopic: {
            type: Sequelize.STRING
        }
    });

    return Chat_Company;
};