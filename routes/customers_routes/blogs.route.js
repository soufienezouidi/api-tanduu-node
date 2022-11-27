const controller = require("../../controllers/customers_controllers/blog.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    }); /* GET ALL CATEGORIES */
    app.get("/api/customers/blogs",
        controller.getBlogs);

    /* GET BLOG BY ID */
    app.post("/api/customers/blogs/show-blog",
        controller.getBlogById);

    /* GET BLOG HASHTAGS */
    app.get("/api/customers/blogs/stats",
        controller.getAllBlogsStats);

    /* GET BLOG CATEGORIES */
    app.get("/api/customers/blogs/categories",
        controller.getAllBlogsCategorieStats);
    /* GET BLOG CATEGORIES */
    app.get("/api/customers/blogs/categories",
        controller.getAllBlogsCategorieStats);

    /* GET BLOG BY CATEGORY NAME */
    app.get("/api/customers/blogs/categories/:categoryName",
        controller.getBlogByCategoryName);
}
