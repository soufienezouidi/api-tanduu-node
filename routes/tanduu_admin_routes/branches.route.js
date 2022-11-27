const { authJwt } = require("../../middleware");
const controller = require("../../controllers/tanduu_admin_controllers/branches.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /* GET ALL BRANCHES */
  app.get("/api/tanduu_admin/branches",
  [authJwt.verifyToken, authJwt.isTanduu],
   controller.getAllBranches);

  /* ADD NEW BRANCHE */
  app.post("/api/tanduu_admin/branches/add",
  [authJwt.verifyToken, authJwt.isTanduu],
   controller.addBranche);

   /* EDIT BRANCHE */
  app.post("/api/tanduu_admin/branches/edit",
  [authJwt.verifyToken, authJwt.isTanduu],
   controller.editBranche);


/* ENABLE / DISABLE BRANCHE */
app.post("/api/tanduu_admin/branches/enable",
  [authJwt.verifyToken, authJwt.isTanduu],
  controller.enableBranche); 


/* DELETE BRANCHE */
app.post("/api/tanduu_admin/branches/delete",
  [authJwt.verifyToken, authJwt.isTanduu],
  controller.deleteBranche); 
}
