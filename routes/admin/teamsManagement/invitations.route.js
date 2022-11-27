const controller = require("../../../controllers/admin/invitation.controller");
const {
    authJwt
} = require("../../../middleware");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    /* GET ALL INVITATIONS BY SENDER ID */
    app.post("/api/admin/invitations/sent", controller.getAllInvitationSend);

    /* GET ALL INVITATIONS BY RECEIVER ID */
    app.post("/api/admin/invitations/received", controller.getAllInvitationReceived);

    /* SENT INVITATION TO EXIST USER */
    app.post("/api/admin/invitations/sent-to-exist-user", controller.sendInvitationToExistUser);

    /* SENT INVITATION TO NEW USER */
    app.post("/api/admin/invitations/sent-to-new-user", controller.sendInvitationToNewUser);

    /* ACCEPT INVITATION */
    app.get("/api/admin/invitations/accept", controller.acceptOrDeclineInvitation);

    /* DECLINE INVITATION */
    app.get("/api/admin/invitations/decline", controller.acceptOrDeclineInvitation);

    /* GET SINGLE INVITATION BY KEY */
    app.post("/api/admin/invitations/single", controller.getSingleInvitationByKey);


};