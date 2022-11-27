const {
    authJwt,
    verifyCode
} = require("../../middleware");

//, verifyCode.checkSecurityCode
const controller = require("../../controllers/tanduu_admin_controllers/descriptions.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/tanduu_admin/descriptions/getbyid",
        //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
        controller.getdescriptionbycategoryid);
        app.post("/api/tanduu_admin/descriptions/edit",
        //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
        controller.updatedescription);
    app.post("/api/tanduu_admin/descriptions/add",
        //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
        controller.adddescription);
}