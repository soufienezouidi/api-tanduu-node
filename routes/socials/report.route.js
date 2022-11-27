const controller = require("../../controllers/socials/report.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/report/create", controller.createReport);
    app.get("/api/report/all", controller.getAllReportersCategories);
};