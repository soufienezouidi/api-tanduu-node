const controller = require("../../controllers/socials/posts.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/comments/post", controller.commentsPosts);
    app.post("/api/comments/media/all", controller.commentsMedia);
    app.post("/api/comments/bounces/all", controller.commentsBounces);
    app.post("/api/comments/update", controller.updatecomment);
    app.post("/api/comments/identifier", controller.commentById);
    app.post("/api/comments/create", controller.createCommentsPost);
    //replies
    app.post("/api/comments/reply/comments", controller.commentsRepliesComment);
    app.post("/api/comments/reply/update", controller.updatecommentReplies);
    app.post("/api/comments/reply/identifier", controller.commentRepliesById);
    app.post("/api/comments/reply/create", controller.createCommentsReplies);
};