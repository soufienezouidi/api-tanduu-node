module.exports = (sequelize, Sequelize) => {
    const One_to_one_chat = sequelize.define("One_to_one_chat", {

        member1: {
            type: Sequelize.JSON
        },
        member2: {
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
            type: Sequelize.BOOLEAN
        }
    });

    return One_to_one_chat;
};