module.exports = (sequelize, Sequelize) => {
    const PostHashtags = sequelize.define("post_hashtags", {
        hashtag: {
            type: Sequelize.STRING
        },
        posts: {
            type: Sequelize.JSON
        },
        count: {
            type: Sequelize.INTEGER
        }
    });
    return PostHashtags;
};