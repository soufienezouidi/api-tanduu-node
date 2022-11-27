module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
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
        },
        location: {
            type: Sequelize.JSON,
        },
        device_type: {
            type: Sequelize.STRING,
        },
        poster_type: {
            type: Sequelize.STRING,
        },
        files: {
            type: Sequelize.JSON,
        },
        hashed: {
            type: Sequelize.STRING,
        },
        is_shared: {
            type: Sequelize.BOOLEAN,
        },
        is_schedule: {
            type: Sequelize.BOOLEAN,
        },
        addedAt: {
            type: Sequelize.DATE,
        },
        link_content: {
            type: Sequelize.JSON,
        },
    });

    return Post;
};