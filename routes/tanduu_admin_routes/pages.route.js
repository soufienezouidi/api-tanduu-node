const {
    authJwt,
    verifyCode
} = require("../../middleware");

//, verifyCode.checkSecurityCode
const controller = require("../../controllers/tanduu_admin_controllers/pages.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/tanduu_admin/pages/getbyname",
        //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
        controller.getpagebyname);
    app.post("/api/tanduu_admin/pages/edit",
        //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
        controller.updatepage);
}