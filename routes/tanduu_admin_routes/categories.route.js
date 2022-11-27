const {
  authJwt,
  verifyCode
} = require("../../middleware");
//, verifyCode.checkSecurityCode
const controller = require("../../controllers/tanduu_admin_controllers/categories.controller");



module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  /* GET ALL CATEGORIES */
  app.get("/api/tanduu_admin/categories",
    //[authJwt.verifyToken, authJwt.isTanduu],
    controller.getAllCategories);

  /*------------------------------------ */
  /* ADD NEW CATEGORIE */
  app.post("/api/tanduu_admin/categories/add",
    // [authJwt.verifyToken, authJwt.isTanduu/*, verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
    controller.addNewCatgory);

  /*------------------------------------ */
  /* EDIT CATEGORY */
  app.post("/api/tanduu_admin/categories/edit",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
    controller.editCategory);

  /*------------------------------------ */
  /* ACCEPT CATEGORY */
  app.post("/api/tanduu_admin/categories/accept",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
    controller.acceptCategory);

  /*------------------------------------ */
  /* ENABLE CATEGORY */
  app.post("/api/tanduu_admin/categories/enable",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
    controller.enableCategory);
  app.post("/api/tanduu_admin/categories/updatecateg",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
    controller.updatecateg);
  app.post("/api/tanduu_admin/categories/getbyid",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
    controller.getcategorybyid);
  /*------------------------------------ */
  /* ADD CATEGORY'S PICTURE */
  app.post("/api/tanduu_admin/categories/upload_picture/:category_id",
    //[authJwt.verifyToken, authJwt.isTanduu,/* verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
    controller.uploadPictureCategories);

  /*------------------------------------ */
  /* GET ALL SUBCATEGORIES */
  app.get("/api/tanduu_admin/sub-categories",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
    controller.getAllSubCategories);

  app.post("/api/tanduu_admin/sub-categories/updatesubcateg",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
    controller.updatesub);


  /*------------------------------------ */
  /* ADD NEW SUB-CATEGORIE */
  app.post("/api/tanduu_admin/sub-categories/add",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
    controller.addNewSubCatgory);

  /*------------------------------------ */
  /* EDIT SUB-CATEGORY */
  app.post("/api/tanduu_admin/sub-categories/edit",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
    controller.editSubCategory);

  /*------------------------------------ */
  /* ACCEPT SUB-CATEGORY */
  app.post("/api/tanduu_admin/sub-categories/accept",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
    controller.acceptSubCategory);

  /*------------------------------------ */
  /* ENABLE SUB-CATEGORY */
  app.post("/api/tanduu_admin/sub-categories/enable",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
    controller.enableSubCategory);

  /*------------------------------------ */
  /* ADD SUB-CATEGORY'S PICTURE */
  app.post("/api/tanduu_admin/sub-categories/upload_picture/:sub_id",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
    controller.uploadPictureSubCategories);

  /*------------------------------------ */
  /* GET ALL SERVICES */
  app.get("/api/tanduu_admin/services",
    //[authJwt.verifyToken, authJwt.isTanduu,/* verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
    controller.getAllServices);
  app.post("/api/tanduu_admin/servicesbysub",
    //[authJwt.verifyToken, authJwt.isTanduu,/* verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
    controller.getAllServicesbysub);
  /*------------------------------------ */
  /* ADD NEW SERVICE */
  app.post("/api/tanduu_admin/services/add",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
    controller.addNewService);

  /*------------------------------------ */
  /* EDIT SERVICE */
  app.post("/api/tanduu_admin/services/edit",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
    controller.editService);

  /*------------------------------------ */
  /* ACCEPT SERVICE */
  app.post("/api/tanduu_admin/services/accept",
    // [authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
    controller.acceptService);

  /*------------------------------------ */
  app.post("/api/tanduu_admin/services/updateservice",
    //[authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode,verifyCode.checkExpirationCode*/],
    controller.updateservice);
  /* ENABLE SERVICE */
  app.post("/api/tanduu_admin/services/enable",
    // [authJwt.verifyToken, authJwt.isTanduu, /*verifyCode.checkSecurityCode, verifyCode.checkExpirationCode*/],
    controller.enableService);
}