const db = require("../../../../models");
const Location = db.locations;
const Company = db.companies;

/* ADD LOCATION */

exports.addLocation = (req, res) => {
  Location.create(req.body)
    .then((location) => {
      res.status(200).json({
        success: true,
        data: location,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

/* GET LOCATION BY ID */
exports.getLocationsById = (req, res) => {
  Location.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((location) => {
      if (!location) {
        res.status(200).json({
          message: "locations not found",
          success: false,
        });
      } else {
        res.status(200).json({
          data: location,
          success: true,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
};

/* ADD LOCATION  (UPDATE DISTANCE OR ENABLE / DISABLE LOCATION)*/

exports.editLocation = (req, res) => {
  Location.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((location) => {
      if (!location) {
        res.status(200).json({
          success: false,
          message: "Location not found",
        });
      } else {
        location
          .update(req.body)
          .then((updatetd) => {
            res.status(200).json({
              message: "Location has been set successfully",
              success: true,
            });
          })
          .catch((e) => {
            res.status(500).json({
              message: e.message,
              success: false,
            });
          });
      }
      res.status(200).json({
        success: true,
        data: location,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};
exports.getLocationsByCompId = (req, res) => {
  Location.findAll({
    where: {
      companyId: req.body.companyId,
      is_deleted: 0,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  })
    .then((locations) => {
      if (!locations) {
        res.status(200).json({
          message: "locations not found with company id " + req.body.compid,
        });
      } else {
        res.status(200).json({
          locations,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

// GET ALL LOCATIONS
exports.getAllLocations = (req, res) => {
  Location.findAll({
    where: {
      is_active: 1,
      is_deleted: 0,
    },
    include: [
      {
        model: db.companies,
        as: "company",
      },
    ],
  })
    .then((locations) => {
      res.status(200).json({
        data: locations,
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
};

// GET SERVICES BY COMPANY ID
exports.getServicesByCompanyId = (req, res) => {
  Location.findOne({
    where: {
      companyId: req.body.companyId,
      is_deleted: 0,
    },
    include: [
      {
        model: db.companies,
        as: "company",
      },
    ],
  })
    .then((locations) => {
      res.status(200).json({
        services: locations.services,
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
};

// GET COMPANIES BY ID
exports.getCompaniesId = (req, res) => {
  var IdsCompanies = req.body.IdsCompanies;
  var arrCompa = [];
  //  IdsCompanies.forEach(element => {
  Company.findAll({
    where: {
      id: IdsCompanies,
    },
    include: [
      {
        model: db.user,
      },
      {
        model: db.categories,
        as: "category",
      },
    ],
  })
    .then((companies) => {
      res.status(200).json({
        companies: companies,
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });

  // });
};
