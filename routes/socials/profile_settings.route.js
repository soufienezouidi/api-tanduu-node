const controller = require("../../controllers/socials/profileSetting.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/settings/user", controller.profileSettingsUser);
    app.post("/api/settings/companies", controller.profileSettingsCompany);
    app.post("/api/settings/update", controller.updateSettings);
    app.post("/api/settings/create", controller.createSettings);
    app.post("/api/send/email/code", controller.sendCodeEamil);
};