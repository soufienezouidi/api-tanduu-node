const { checkUpload, authJwt } = require('../../middleware')
const controller = require("../../controllers/bankAccounts.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* Get company by user Id */
    app.post("/api/admin/bank-accounts",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.getBankAccountsByUserId);


    app.post("/api/admin/update/bank-account",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.updateBankAccountByUser);


    app.post("/api/admin/add-bank-account",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.addBankAccount);
};