const controller = require("../../controllers/notifications/notificationsController");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* CREATE NEW NOTIFICATION */
    app.post("/api/notifications/create", controller.createNotification);

    /* UPDATE NOTIFICATION */
    app.post("/api/notifications/update", controller.updateNotification);

    /* GET NOTIFICATION BY STATE */
    app.post("/api/notifications/state", controller.getNotificationByState);

    /* GET NOTIFICATION BY RECEIVER */
    app.post("/api/notifications/receiver", controller.getNotificationByReceiver);
};