const { checkUpload, authJwt } = require("../../../middleware");
const controller = require("../../../controllers/admin/orders/SourcesController");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* GET CSOURCES BY COMPANY ID  */

    app.post("/api/admin/orders/sources",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.getSourcesByCompanyId);

    /* ADD NEW SOURCE */
    app.post("/api/admin/orders/sources/new-update",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.createOrUpdateSource);
};