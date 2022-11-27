const controller = require("../../controllers/socials/profile_informations.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/profile/information/user", controller.profileInformationsUser);
    app.post("/api/profile/information/companies", controller.profileInformationsCompany);
    app.post("/api/profile/information/update", controller.updateInformations);
    app.post("/api/profile/information/create", controller.createInformations);
};