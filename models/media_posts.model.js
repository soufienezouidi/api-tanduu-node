module.exports = (sequelize, Sequelize) => {
    const MediaPosts = sequelize.define("media_posts", {
        filename: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        },
        file_type: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        link_hashed: {
            type: Sequelize.STRING
        },
        reactions_stats: {
            type: Sequelize.JSON
        }
    });
    return MediaPosts;
};