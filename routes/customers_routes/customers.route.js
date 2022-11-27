const {
  authJwt
} = require("../../middleware");
const controller = require("../../controllers/customers_controllers/categories.controller");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  /* GET ALL CATEGORIES */
  app.get("/api/customers/categories",
    controller.getAllCategories);
  app.post("/api/customers/categories/getbyid",
    controller.getcategorybyid);
  app.post("/api/customers/categories/getbyname",
    controller.getcategorybyname);
  /*------------------------------------ */
  /* GET ALL SUBCATEGORIES */
  app.post("/api/customers/sub-categories",
    controller.getSubByCategoryId);

  /*------------------------------------ */
  /* GET ALL SERVICES */
  app.post("/api/customers/services",
    controller.getServicesBySubCategoryId);

  /*------------------------------------ */
  /* GET  SERVICES BY CATg ID */
  app.post("/api/customers/services/category",
    controller.getServicesByCategoryId);

  /*------------------------------------ */
  /* GET ALL SERVICES */
  app.get("/api/customers/services/all",
    controller.getAllServices);
  app.post("/api/customers/services/getone",
    controller.getServiceById);

};