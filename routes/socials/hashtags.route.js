const controller = require("../../controllers/socials/hashtags.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/post/hashtags/create", controller.createHashtag);
    app.post("/api/post/hashtags/update", controller.editHashtag);
};