const controller = require("../../controllers/user_blogs/blogs.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/user-blogs/all", controller.getBlogsByUserId);
    app.get("/api/user-blogs/:user/:name", controller.getBlogUserPic);
    app.post("/api/company/blogs/all", controller.getBlogsByCompanyId);
    app.post("/api/users-blogs/identifiant", controller.getBlogById);
    app.post("/api/users-blogs/create", controller.addNewBlog);
    app.post("/api/users-blogs/edit", controller.editBlog);
    app.post("/api/users-blogs/delete", controller.deleteBlog);
    app.get("/api/users-blogs/all-blogs", controller.getAllBlogs);
};