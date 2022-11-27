const controller = require("../../controllers/socials/socials.invitations.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });



    /* GET ALL INVITATIONS BY SENDER ID */
    app.post("/api/invitations/sent", controller.showAllInvitationsSent);

    /* GET ALL INVITATIONS BY RECEIVER ID */
    app.post("/api/invitations/received", controller.showAllInvitationsReceived);

    /* SENT INVITATION TO EXIST USER */
    app.post("/api/invitations/send-invitation", controller.sendInvitation);

    /* ACCEPT INVITATION */
    app.post("/api/invitations/accept", controller.acceptOrDeclineInvitation);

    /* DECLINE INVITATION */
    app.post("/api/invitations/decline", controller.acceptOrDeclineInvitation);

    /* GET SINGLE INVITATION BY KEY */
    app.post("/api/invitations/single", controller.getSingleInvitationByKey);

    /* UPDATE CONTACT TABLE */
    app.post("/api/contact/update", controller.contactUpdate);
    app.post("/api/invitations/update", controller.updateInvitation);

    /* UPDATE CONTACT TABLE */
    app.post("/api/contact/update", controller.contactUpdate);

    /* get invitation between tow users */
    app.post("/api/invitations/relation", controller.getRelationsUsers);

};