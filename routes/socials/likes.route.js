const controller = require("../../controllers/socials/likes.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/likes/posts", controller.AllLikesPosts);
    app.post("/api/likes/comment", controller.AllLikesComments);
    app.post("/api/likes/comment-replies", controller.AllLikesCommentsReplies);
    app.post("/api/likes/update", controller.updateLike);
    app.post("/api/likes/identifier", controller.likeById);
    app.post("/api/likes/create", controller.createlikes);
};