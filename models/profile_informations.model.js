module.exports = (sequelize, Sequelize) => {
    const profileInformations = sequelize.define("profile_informations", {
        hobbies: {
            type: Sequelize.JSON
        },
        works: {
            type: Sequelize.JSON
        },
        introduction: {
            type: Sequelize.STRING
        },
        socials: {
            type: Sequelize.JSON
        },
        badges: {
            type: Sequelize.JSON
        },
        educations: {
            type: Sequelize.JSON
        },
        phones: {
            type: Sequelize.JSON
        },
        emails: {
            type: Sequelize.JSON
        },
        family_relationships: {
            type: Sequelize.JSON
        },
        life_events: {
            type: Sequelize.JSON
        },

    });
    return profileInformations;
};