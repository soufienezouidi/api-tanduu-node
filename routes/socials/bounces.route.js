const controller = require("../../controllers/socials/bounces.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/bounces/all", controller.allStories);
    app.post("/api/bounces/user", controller.allStoriesOfUser);
    app.post("/api/bounces/hashed", controller.getStoryLink);
    app.post("/api/bounces/create", controller.createStories);
    app.post("/api/bounces/update", controller.updateStory);
    app.post("/api/bounces/last", controller.getLastBounce);
    app.post("/api/bounces/previous", controller.getPreviousBounce);
    app.post("/api/bounces/delete-file", controller.deleteFile);
    app.get("/api/bounces/:userId/:fileName", controller.getStoryFile);
    app.get("/api/background/:fileName", controller.getStoryBackground);
};