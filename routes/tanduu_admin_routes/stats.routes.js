const {
    authJwt,
    verifyCode
} = require("../../middleware");
//, verifyCode.checkSecurityCode
const controller = require("../../controllers/tanduu_admin_controllers/statsController");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    /* GET ALL users */
    app.get("/api/tanduu_admin/partners",
        //[authJwt.verifyToken, authJwt.isTanduu],
        controller.getallcompanies);
    app.get("/api/tanduu_admin/users",
        //[authJwt.verifyToken, authJwt.isTanduu],
        controller.getallusers);

}