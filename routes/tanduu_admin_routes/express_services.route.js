const {
    authJwt,
    verifyCode
} = require("../../middleware");
//, verifyCode.checkSecurityCode
const controller = require("../../controllers/tanduu_admin_controllers/express_services.controller");



module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    /* GET ALL CATEGORIES */
    app.get("/api/tanduu_admin/express",
        //[authJwt.verifyToken, authJwt.isTanduu],
        controller.getallexpressservices);

    /*------------------------------------ */
    /* ADD NEW CATEGORIE */
    app.post("/api/tanduu_admin/express/add",
        // [authJwt.verifyToken, authJwt.isTanduu/*, verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
        controller.addNewexpress);
    /* EDIT CATEGORY */
    app.post("/api/tanduu_admin/express/edit",
        //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
        controller.editexpressservice);

    /*------------------------------------ */
    /* ACCEPT CATEGORY */
    app.post("/api/tanduu_admin/express/accept",
        //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
        controller.acceptexpressservice);
    app.post("/api/tanduu_admin/express/updateexpress",
        //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
        controller.updateexpress);
    /*------------------------------------ */
    /* ENABLE CATEGORY */
    app.post("/api/tanduu_admin/express/enable",
        //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
        controller.enableexpress);
}