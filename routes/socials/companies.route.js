const controller = require("../../controllers/socials/companies.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/user/companies/users", controller.getPageByUser);
    app.get("/api/user/companies/all", controller.getAllCompanies);
    app.post("/api/user/companies/hashed", controller.getPageByLink);
    app.post("/api/user/companies/update", controller.updatePage);
    app.post("/api/users/companies/create-new", controller.createPage);
    app.post("/api/users/companies/profile/:user/:page/:fileName", controller.getPageProfile);
    app.post("/api/users/companies/cover/:user/:page/:fileName", controller.getPageCover);
    app.post("/api/users/companies/albums/all", controller.getAllAlbumsOfUser);

};