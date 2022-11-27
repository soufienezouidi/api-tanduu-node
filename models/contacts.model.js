module.exports = (sequelize, Sequelize) => {
    const Contacts = sequelize.define("contacts", {

        followers: {
            type: Sequelize.JSON
        },
        following: {
            type: Sequelize.JSON
        },
        friends: {
            type: Sequelize.JSON
        },
        members: {
            type: Sequelize.JSON
        }
    });

    return Contacts;
};