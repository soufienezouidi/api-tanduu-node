const controller = require("../../../controllers/admin/Teams_managemenet/TeamsManagementController");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    /* ADD NEW MEMBER TO TEAM */
    app.post("/api/admin/team/new-update", controller.updateOrCreate);

    /* GET ALL MEMBERS */
    app.post("/api/admin/team", controller.getAllMemebers);

};