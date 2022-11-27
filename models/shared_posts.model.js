module.exports = (sequelize, Sequelize) => {
    const SharedPost = sequelize.define("shared_posts", {
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
        visibility: {
            type: Sequelize.STRING
        },
        reactions_stats: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        attached_persons: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        hashtags: {
            type: Sequelize.JSON,
            defaultValue: []
        }
    });

    return SharedPost;
};