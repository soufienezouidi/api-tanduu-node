const controller = require("../../controllers/socials/stories.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/stories/all", controller.allStories);
    app.post("/api/stories/hashed", controller.getStoryLink);
    app.post("/api/stories/create", controller.createStories);
    app.post("/api/stories/update", controller.updateStory);
    app.get("/api/stories/:userId/:fileName", controller.getStoryFile);
    app.get("/api/background/:fileName", controller.getStoryBackground);
};