const { authJwt, verifyCode } = require("../../../middleware");
//, verifyCode.checkSecurityCode
const location = require("../../../controllers/admin/account/locations&services/LocationsController");
const services = require("../../../controllers/admin/account/locations&services/ServicesController");
const profile = require("../../../controllers/admin/account/profile/ProfileController");
const filter = require("../../../controllers/customers_controllers/filterServices.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* GET PROFILE */

    app.get("/api/admin/profile",
        //[authJwt.verifyToken, authJwt.isTanduu],
        profile.getProfile);


}