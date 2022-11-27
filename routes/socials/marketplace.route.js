const controller = require("../../controllers/socials/marketplace.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/marketplace/users", controller.getPageByUser);
    app.post("/api/marketplace/hashed", controller.getPageByLink);
    app.post("/api/marketplace/update", controller.updatePage);
    app.post("/api/marketplace/create", controller.createPage);
    app.get("/api/marketplace/cover/:fileName", controller.getPageProfile);
    // app.post("/api/pages/cover/:user/:page/:fileName", controller.getPageCover);
    app.post("/api/marketplace/all/product", controller.getAllAlbumsOfUser);

};