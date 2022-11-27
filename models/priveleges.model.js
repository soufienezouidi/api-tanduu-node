module.exports = (sequelize, Sequelize) => {
    const Privileges = sequelize.define("privileges", {
        privileges: {
            type: Sequelize.JSON
        }
    });

    return Privileges;
};