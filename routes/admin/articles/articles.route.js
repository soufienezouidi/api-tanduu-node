const { checkUpload, authJwt } = require("../../../middleware");
const controller = require("../../../controllers/admin/articles/articles.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* GET ALL ARTCILES */
    app.post("/api/admin/articles",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.getAllArticles);

    /* CREATE NEW GROUP */
    app.post("/api/admin/group/new",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.addNewGroup);

    /* UPDATE GROUP OR ARTICLE */
    app.post("/api/admin/group/articles/update",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.updateGroupOrArticle);
};