module.exports = (sequelize, Sequelize) => {
    const Bounces = sequelize.define("bounces", {
        link: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        is_deleted: {
            type: Sequelize.BOOLEAN

        },
        is_archived: {
            type: Sequelize.BOOLEAN
        },
        background: {
            type: Sequelize.STRING
        },
        font: {
            type: Sequelize.STRING
        },
        text: {
            type: Sequelize.STRING
        },
        file: {
            type: Sequelize.STRING
        },
        visibility: {
            type: Sequelize.STRING
        },
        filter: {
            type: Sequelize.STRING
        },
        sticker: {
            type: Sequelize.STRING
        },
        thumbnails: {
            type: Sequelize.STRING
        },
        style: {
            type: Sequelize.JSON
        },
        allow_comments: {
            type: Sequelize.JSON
        },
        reactions: {
            type: Sequelize.JSON
        },
        views: {
            type: Sequelize.JSON
        }
    });
    return Bounces;
};