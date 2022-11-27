const { checkUpload, authJwt } = require('../../../middleware')
const controller = require("../../../controllers/cashbook/cashbook.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* Get company by user Id */
    app.post("/api/cashbook",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.getAllCashbookData);


    app.post("/api/cashbook/add/cashbook",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.addNewCashbook);
};