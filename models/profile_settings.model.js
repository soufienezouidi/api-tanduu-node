module.exports = (sequelize, Sequelize) => {
    const profileSetting = sequelize.define("profile_settings", {
        profile: {
            type: Sequelize.JSON
        },
        posts: {
            type: Sequelize.JSON
        },
        friends_list: {
            type: Sequelize.JSON
        },
        requests: {
            type: Sequelize.JSON
        },
        messages: {
            type: Sequelize.JSON
        },
        notifications: {
            type: Sequelize.JSON
        },

    });
    return profileSetting;
};