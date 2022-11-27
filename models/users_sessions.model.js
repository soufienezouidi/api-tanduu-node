module.exports = (sequelize, Sequelize) => {
    const Sessions = sequelize.define("sessions", {
        hours: {
            type: Sequelize.DOUBLE
        },
        session_details: {
            type: Sequelize.JSON
        }

    });

    return Sessions;
};