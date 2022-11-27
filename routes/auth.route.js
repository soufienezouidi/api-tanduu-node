const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup", [verifySignUp.checkDuplicateUsername,
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);
    app.post('/api/auth/account-confirmation', controller.confirmCode);
    app.post('/api/auth/forget-password', controller.forgetPassword);
    app.post('/api/auth/show-reset-password', controller.showFormResetPassword);
    app.post('/api/auth/reset-password', controller.resetPassword);
    app.post('/api/auth/reset-token', controller.resetCode);
    app.post('/api/account/update-password', controller.updatePassword);
    app.post('/api/auth/logout', controller.logout);

};