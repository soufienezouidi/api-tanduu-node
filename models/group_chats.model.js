module.exports = (sequelize, Sequelize) => {
    const Group_chat = sequelize.define("group_chat", {
        company_id: {
            type: Sequelize.STRING
        },
        members: {
            type: Sequelize.JSON
        },
        chat_accecibility_time: {
            type: Sequelize.JSON
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        room_name: {
            type: Sequelize.STRING
        },
        file_name: {
            type: Sequelize.STRING
        }
    });

    return Group_chat;
};