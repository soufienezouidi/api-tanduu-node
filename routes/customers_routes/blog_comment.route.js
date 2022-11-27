const controller = require("../../controllers/customers_controllers/blog_comments.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    }); /* GET ALL comments by blog id  */
    app.post("/api/customers/blog/comments",

        controller.getBlogcommentsById);
    /* ADD NEW BLOG comment */
    app.post("/api/customers/blog/comment/add",

        controller.addcomment);
}