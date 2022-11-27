module.exports = (sequelize, Sequelize) => {
    const UserBlogs = sequelize.define("user_blogs", {

        title: {
            type: Sequelize.STRING
        },

        description: {
            type: Sequelize.TEXT
        },
        hashtags: {
            type: Sequelize.JSON
        },
        author: {
            type: Sequelize.JSON
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        introduction: {

            type: Sequelize.TEXT

        },
        languages: {

            type: Sequelize.STRING
        },
        stats: {
            type: Sequelize.JSON
        },
        likers: {
            type: Sequelize.JSON
        },
        privacy: {
            type: Sequelize.STRING
        }
    });

    return UserBlogs;
};