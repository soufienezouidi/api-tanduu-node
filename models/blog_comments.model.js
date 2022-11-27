module.exports = (sequelize, Sequelize) => {
    const Blog_comments = sequelize.define("blog_comments", {

        id_blog: {
            type: Sequelize.INTEGER
        },

        comment: {
            type: Sequelize.JSON
        },



    });

    return Blog_comments;
};