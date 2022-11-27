const { checkUpload, authJwt } = require("../../middleware");
const controller = require("../../controllers/admin/company/CompanyController");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* Get company by user Id */
    app.post(
        "/api/admin/companyid",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.getCompanyById
    );

    /* Get company by user id */
    app.post(
        "/api/admin/company",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.getCompanyByUserId
    );

    /* Get companies by user id */
    app.post(
        "/api/admin/company/all",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.getCompaniesById
    );

    /* update company */

    app.post(
        "/api/admin/update",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.updateCompanyUser
    );

    app.post(
        "/api/admin/update/link",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.updateCompnyLink
    );

    /* Get company by username*/
    app.post(
        "/api/admin/company/username",
        //[authJwt.verifyToken, authJwt.isAdmin]
        controller.getCompanyByUsername
    );
};