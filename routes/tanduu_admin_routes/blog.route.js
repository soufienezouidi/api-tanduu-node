const {
    checkUpload,
    authJwt
} = require("../../middleware");
const controller = require("../../controllers/tanduu_admin_controllers/BlogsController");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* GET ALL BLOGS */
    app.get("/api/tanduu_admin/blogs",
        controller.getBlogs);

    /* GET BLOG BY ID */
    app.get("/api/tanduu_admin/blogs/show-blog",
        controller.getBlogById);

    /* ADD NEW BLOG */
    app.post("/api/tanduu_admin/blogs/add",

        controller.addBlog);

    /* EDIT BLOG */
    app.post("/api/tanduu_admin/blogs/edit",
        // [authJwt.verifyToken, authJwt.isTanduu],
        controller.editBlog);

    /* DELETE BLOG */
    app.post("/api/tanduu_admin/blogs/delete",
        // [authJwt.verifyToken, authJwt.isTanduu],
        controller.deleteBlog);
}