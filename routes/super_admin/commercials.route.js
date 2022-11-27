
const controller = require("../../controllers/super_admin/commercialController");
const { authJwt, verifySignUp } = require("../../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* ADD COMMERCIAL */
    app.post("/api/super-admin/commercials/add",
        [verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted,/* authJwt.isSuperAdmin*/],
        controller.addNewCommercial);
}