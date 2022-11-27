module.exports = (sequelize, Sequelize) => {
    const CommentsPosts = sequelize.define("comment_posts", {
        content: {
            type: Sequelize.TEXT
        },
        type: {
            type: Sequelize.STRING
        },
        is_accepted: {
            type: Sequelize.BOOLEAN
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        reactions_stats: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        file: {
            type: Sequelize.STRING,
        },
        hashed_link: {
            type: Sequelize.STRING
        },
        comment_link: {
            type: Sequelize.JSON
        }
    });

    return CommentsPosts;
};