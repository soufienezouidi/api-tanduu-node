const { checkUpload, authJwt } = require("../../../middleware");
const controller = require("../../../controllers/admin/orders/UrgentInformationControlelr");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    /* GET ALL INFORMATIONS */
    app.post("/api/admin/orders/informations",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.getAllUrgentInformations);

    /* GET INFOMRATIONS BY ID 
    app.post("/api/admin/orders/informations",
        //[authJwt.verifyToken, authJwt.isTanduu],
        controller.);*/

    /* ADD INFOMRATION */
    app.post("/api/admin/orders/informations/new-update",
        //[authJwt.verifyToken, authJwt.isTanduu],
        controller.createOrUpdateInformation);

    /* ADD INFOMRATION */
    app.post("/api/admin/orders/informations/update",
        //[authJwt.verifyToken, authJwt.isTanduu],
        controller.createOrUpdateInformation);
}


