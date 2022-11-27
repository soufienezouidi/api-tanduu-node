module.exports = (sequelize, Sequelize) => {
    const Blogs = sequelize.define("blogs", {

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
        }
    });

    return Blogs;
};