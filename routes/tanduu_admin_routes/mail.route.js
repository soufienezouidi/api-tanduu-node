const { authJwt } = require("../../middleware");
const controller = require("../../controllers/tanduu_admin_controllers/MailsController");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
/* GET ALL CATEGORIES */
  app.post("/api/tanduu_admin/send/mail",
  [authJwt.verifyToken, authJwt.isTanduu],
   controller.sendMailVerification);
}