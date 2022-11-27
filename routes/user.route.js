const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const controller1 = require("../controllers/tanduu_admin_controllers/categories.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/account/all", controller.allAccess);

    app.get("/api/user", [authJwt.verifyToken], controller.userBoard);

    /* GET USER BY ID */
    app.post(
        "/api/user/identifier",
        //[authJwt.verifyToken],
        controller.getUserById
    );

    /*udate user By Id */
    app.post(
        "/api/user/update",
        //[authJwt.verifyToken],
        controller.updateuser
    );

    app.get(
        "/api/partner", [authJwt.verifyToken, authJwt.isPartner],
        controller.partnerBoard
    );

    app.get(
        "/api/admin", [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
    app.get(
        "/api/customer", [authJwt.verifyToken, authJwt.isCustomer],
        controller.customerBoard
    );

    app.get(
        "/api/jobber", [authJwt.verifyToken, authJwt.isJobber],
        controller.jobberBoard
    );

    app.get(
        "/api/super_admin", [authJwt.verifyToken, authJwt.isSuperAdmin],
        controller.superAdminBoard
    );

    app.get(
        "/api/tanduu_admin",
        //[authJwt.verifyToken, authJwt.isTanduu],
        controller.tanduuBoard
    );
    app.get("/api/user/:type/:company/:name", controller.getuserphotopath);
    app.get("/api/profile/:userId/:name", controller.userPic);
    app.get("/api/cover/:userId/:name", controller.userPicCover);
    app.get("/api/user/location", controller.getuserlocation);
    app.post("/api/user/link", controller.getUserByLink);
    app.post("/api/user/request", controller.getUser);
    app.get("/api/default/picture/:name", controller.getDefaultPicture);
    app.get("/api/default/cover/:name", controller.getDefaultCover);
};