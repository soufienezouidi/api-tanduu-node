const controller = require("../../controllers/socials/posts.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/posts/all", controller.allPosts);
    app.post("/api/posts/hashed", controller.allPostsByHashed);
    app.post("/api/posts/user", controller.postsUser);
    app.post("/api/posts/companies", controller.postsCompany);
    app.post("/api/posts/update", controller.updatePost);
    app.post("/api/posts/identifier", controller.postById);
    app.post("/api/posts/create", controller.createPost);
    app.post("/api/posts/load/more", controller.loadMore);
    app.get('/api/post/:userId/:postId/:fileName', controller.getPostFile)
};