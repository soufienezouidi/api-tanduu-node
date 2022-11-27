module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("likes", {

        type: {
            type: Sequelize.STRING
        },
        liked_type: {
            type: Sequelize.STRING
        },
        likesUsers: {
            type: Sequelize.JSON
        },
        likeCompanies: {
            type: Sequelize.JSON
        },
    });

    return Like;
};