const controller = require("../../controllers/socials/media_posts.controller");
const controller1 = require("../../controllers/user_blogs/blogs.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/media/create", controller.createMedia); // create media
    app.post("/api/media/update", controller.editMedia); // update media
    app.post("/api/post/media/update", controller.editMediaOfPosts); // update media of post
    app.post("/api/post/media/all", controller.getAllMediaOfPost); // get all media of post
    app.post("/api/user/media/all", controller.getAllMediaOfUser); // get all media of user
    app.post("/api/albums/media/all", controller.getMediaByAlbums); // get all media of albums
    app.post("/api/company/media/all", controller.getAllMediaOfCompany); // get media by company
    app.post("/api/media/identifier", controller.getMediaById); // get media by id
    app.post("/api/media/hashed_link", controller.getMediaByHasheLink); // get media hashed link
    app.post("/api/media/name", controller.getMediaByName); // get media hashed link
    app.post("/api/media/videos", controller.getMediaVideo); // get media hashed link
    app.get("/api/media/all/videos", controller.getMediaAllVideo); // get media hashed link
    app.post("/api/media/images", controller.getMediaImages); // get media hashed link
    app.post("/api/albums/user/all", controller.getAllAlbumsOfUser); // get all user album
    app.post("/api/albums/company/all", controller.getAllAlbumsOfCompany); // get all company album
    app.post("/api/albums/create", controller.createNewAlbum); // create album by user
    app.post("/api/albums/update", controller.updateAlbum); // create albums by company
    app.post("/api/user-blogs/all", controller1.getBlogsByUserId);
    app.post("/api/company/blogs/all", controller1.getBlogsByCompanyId);
    app.post("/api/users-blogs/identifiant", controller1.getBlogById);
    app.post("/api/users-blogs/create", controller1.addNewBlog);
    app.post("/api/users-blogs/edit", controller1.editBlog);
    app.post("/api/users-blogs/delete", controller1.deleteBlog);
};