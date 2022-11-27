const controller = require("../../controllers/socials/pages.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/pages/users", controller.getPageByUser);
    app.post("/api/pages/hashed", controller.getPageByLink);
    app.post("/api/page/update", controller.updatePage);
    app.post("/api/pages/create", controller.createPage);
    app.post("/api/pages/profile/:user/:page/:fileName", controller.getPageProfile);
    app.post("/api/pages/cover/:user/:page/:fileName", controller.getPageCover);
    app.post("/api/pages/albums/all", controller.getAllAlbumsOfUser);

};