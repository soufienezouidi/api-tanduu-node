const controller = require("../../controllers/commercial_controllers/commercial.controller");
const {
    authJwt
} = require("../../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* GET ALL COMMERCIAL */
    app.get("/api/commercials",
        //[authJwt.verifyToken, authJwt.isSuperAdmin],
        controller.getAllCommercials);

    /* GET COMEMRCIAL BY ID */
    app.post("/api/commercials/identifier",
        //[authJwt.verifyToken, authJwt.isSuperAdmin],
        controller.getcommercialById);

    /* GET COMEMRCIAL BY USER ID */
    app.post("/api/commercials/user",
        //[authJwt.verifyToken, authJwt.isSuperAdmin],
        controller.getcommercialByUserId);

    /* GET COMMERCIAL BY CODE */
    app.post("/api/commercials/code",
        //[authJwt.verifyToken, authJwt.isSuperAdmin],
        controller.getcommercialByCode);

    /* UPDATE COMMERCIAL */
    app.post("/api/commercials/update",
        //[authJwt.verifyToken, authJwt.isSuperAdmin],
        controller.update);

    /* ADD NEW CONTRACT */
    app.post("/api/commercials/contract/add",
        //[authJwt.verifyToken, authJwt.isSuperAdmin],
        controller.AddContarct);

    /* GET CONTRACT BY COMMERCIAL ID */
    app.post("/api/commercials/contract/identifier",
        //[authJwt.verifyToken, authJwt.isSuperAdmin],
        controller.getContractByCommercialId);

    /* GET COMMERCIAL ID*/
    app.post("/api/commercials/income",
        //[authJwt.verifyToken, authJwt.isSuperAdmin],
        controller.getCommercialIncome);


    /* GET COMMERCIAL ID*/
    app.post("/api/commercials/incometoday",
        //[authJwt.verifyToken, authJwt.isSuperAdmin],
        controller.getCommercialtodayIncome);



};