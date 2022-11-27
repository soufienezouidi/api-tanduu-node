const controller = require("../../controllers/socials/groups.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/groups/users", controller.getPageByUser);
    app.post("/api/groups/hashed", controller.getPageByLink);
    app.post("/api/groups/update", controller.updatePage);
    app.post("/api/groups/create", controller.createPage);
    app.get("/api/groups/profile/:user/:page/:fileName", controller.getPageProfile);
    app.get("/api/groups/cover/:user/:page/:fileName", controller.getPageCover);
    app.post("/api/groups/albums/all", controller.getAllAlbumsOfUser);


};