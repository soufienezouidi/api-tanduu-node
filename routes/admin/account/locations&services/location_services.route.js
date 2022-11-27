const { authJwt, verifyCode } = require("../../../../middleware");
//, verifyCode.checkSecurityCode
const location = require("../../../../controllers/admin/account/locations&services/LocationsController");
const services = require("../../../../controllers/admin/account/locations&services/ServicesController");
const filter = require("../../../../controllers/customers_controllers/filterServices.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  /* ADD LOCATION */
  app.post(
    "/api/admin/locations/add",
    //[authJwt.verifyToken, authJwt.isTanduu],
    location.addLocation
  );

  /* GET LOCATIONS */
  app.post(
    "/api/admin/locations",
    //[authJwt.verifyToken, authJwt.isTanduu],
    location.getLocationsByCompId
  );

  /* GET LOCATIONS */
  app.post(
    "/api/admin/locations/identifier",
    //[authJwt.verifyToken, authJwt.isTanduu],
    location.getLocationsById
  );

  /* EDIT LOCATION */
  app.post(
    "/api/admin/locations/edit",
    //[authJwt.verifyToken, authJwt.isTanduu],
    location.editLocation
  );

  /* ASSOCIATE SERVICES TO  LOCATIONS */
  app.post(
    "/api/admin/locations/services/add",
    //[authJwt.verifyToken, authJwt.isTanduu],
    services.AddServicesToLocation
  );

  /* EXPORT ALL GATEGORIES */
  app.get(
    "/api/services/categories",
    //[authJwt.verifyToken, authJwt.isTanduu],
    services.exportAllCategories
  );

  /* EXPORT ALL SUB-GATEGORIES */
  app.get(
    "/api/services/sub",
    //[authJwt.verifyToken, authJwt.isTanduu],
    services.exportAllSubCategories
  );

  /* EXPORT ALL  SERVICES */
  app.get(
    "/api/services/all",
    //[authJwt.verifyToken, authJwt.isTanduu],
    services.exportAllServices
  );

  /* EXPORT ALL  SERVICES */
  app.get(
    "/api/services/all/pending",
    //[authJwt.verifyToken, authJwt.isTanduu],
    services.exportAllPendingServices
  );

  /* ASSOCIATE SERVICES TO  LOCATIONS */
  app.post(
    "/api/admin/locations/filter",
    //[authJwt.verifyToken, authJwt.isTanduu],
    filter.filterServices
  );

  /* ASSOCIATE SERVICES BY CITY */
  app.post(
    "/api/admin/locations/filter/city",
    //[authJwt.verifyToken, authJwt.isTanduu],
    filter.filterServicesByCity
  );
  /* ASSOCIATE SERVICES TO  LOCATIONS */
  app.post(
    "/api/admin/suggest/:type",
    //[authJwt.verifyToken, authJwt.isTanduu],
    services.suggestNewService
  );

  app.get(
    "/api/admin/architecture/categories",
    //[authJwt.verifyToken, authJwt.isTanduu],
    services.architectureCategories
  );
  /* ASSOCIATE partners by CITY */
  app.post(
    "/api/admin/locations/allpartners/city",
    //[authJwt.verifyToken, authJwt.isTanduu],
    filter.filterServicesByCity
  );
  app.get(
    "/api/admin/locations/all",
    //[authJwt.verifyToken, authJwt.isTanduu],
    location.getAllLocations
  );

  app.post(
    "/api/admin/services/company",
    //[authJwt.verifyToken, authJwt.isTanduu],
    location.getServicesByCompanyId
  );

  app.post(
    "/api/admin/all/companies",
    //[authJwt.verifyToken, authJwt.isTanduu],
    location.getCompaniesId
  );
  app.post(
    "/api/admin/all/services/sub",
    //[authJwt.verifyToken, authJwt.isTanduu],
    services.allservicesKeys
  );
};
