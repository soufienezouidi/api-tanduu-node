const {
  authJwt
} = require("../../middleware");
const controller = require("../../controllers/tanduu_admin_controllers/translation.controller");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  /* GET ALL Texts */
  app.get("/api/tanduu_admin/translation",
    //[authJwt.verifyToken, authJwt.isTanduu],
    controller.getAllTexts);

  /* GET ALL Texts by crm */
  app.get("/api/tanduu_admin/translation/crm",
    //[authJwt.verifyToken, authJwt.isTanduu],
    controller.getTextsByCRM);

  /* GET ALL Texts by section */
  app.get("/api/tanduu_admin/translation/plateform",
    //[authJwt.verifyToken, authJwt.isTanduu],
    controller.getTextsByPlatform);
  /*------------------------------------ */
  /* ADD NEW TEXT */
  app.post("/api/tanduu_admin/translation/add",
    //[authJwt.verifyToken, authJwt.isTanduu],
    controller.addNewText);

  /*------------------------------------ */
  /* EDIT TEXT */
  app.post("/api/tanduu_admin/translation/edit",
    //[authJwt.verifyToken, authJwt.isTanduu],
    controller.editText);

  /*------------------------------------ */
  /* DELETE TEXT */
  app.post("/api/tanduu_admin/translation/delete",
    //[authJwt.verifyToken, authJwt.isTanduu],
    controller.deleteText);
  app.post("/api/tanduu_admin/translation/getfilecontent",
    //[authJwt.verifyToken, authJwt.isTanduu],
    controller.gettranslatefile);
  app.get("/api/translation/:name", controller.gettransfile);
};