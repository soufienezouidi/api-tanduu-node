const { ljust } = require("underscore");
const db = require("../../../../models");
const Location = db.locations;
const Category = db.categories;
const SubCategory = db.sub_categories;
const Service = db.services;
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = db.user;
var async = require("async");
const { request } = require("https");

/* ASSOCIATE SERVICES TO  LOCATIONS */
exports.AddServicesToLocation = (req, res) => {
  Location.findOne({
    where: {
      id: req.body.id,
    },
    include: [
      {
        model: db.companies,
        as: "company",
      },
    ],
  })
    .then((location) => {
      if (!location) {
        res.status(200).json({
          success: false,
          message: "No location found with id " + req.body.id,
        });
      } else {
        var currentServices = []; //JSON.parse(location.services);
        var services = req.body.services;
        var index = 0;
        if (services.length < 1) {
          location
            .update({
              services: [],
            })
            .then((successService) => {
              res.status(200).json({
                data: successService,
                message: "New Service was added successfully",
              });
            })
            .catch((err) => {
              res.status(500).json({
                success: false,
                message: err.message,
              });
            });
        } else {
          services.forEach((service) => {
            SubCategory.findOne({
              where: {
                id: parseInt(service),
              },
              include: [
                {
                  model: db.categories,
                },
              ],
            })
              .then((newService) => {
                // var found = currentServices.some(el => el.service.id === service);
                // if (!found) {
                currentServices.push({
                  service: newService,
                  still_do: req.body.still_do,
                  min_price: 0,
                  max_price: 0,
                });
                //}
                //else{
                //const indexObj=  currentServices.findIndex(el => el.service.id === service);
                //  currentServices[indexObj].still_do = req.body.still_do;
                // }
                index++;
                if (services.length === index) {
                  location
                    .update({
                      services: currentServices,
                    })
                    .then((successService) => {
                      res.status(200).json({
                        data: successService,
                        message: "New Service was added successfully",
                      });
                    })
                    .catch((err) => {
                      res.status(500).json({
                        success: false,
                        message: err.message,
                      });
                    });
                }
              })
              .catch((err) => {
                res.status(500).json({
                  success: false,
                  message: err.message,
                });
              });
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

exports.getUsersByServicesAndAddress = (req, res) => {
  var usersIDs = [];
  Location.findAll({
    where: {
      zip_code: req.body.zip_code,
    },
    attributes: {
      exclude: ["is_active", "createdAt", "updatedAt"],
    },
  })
    .then((locations) => {
      if (!locations) {
        console.log("no data location");
        res.status(200).json({
          success: false,
          message: "Location not found with the given services",
        });
      } else {
        var services = req.body.my_services;
        locations.map(function (location) {
          for (var i = 0; i < services.length; i++) {
            if (location.services) {
              var Json = location.services;
              console.log(location.services);

              for (var j = 0; j < Json.length; j++) {
                var serv = Json[j];
                if (serv["service"]["id"] == services[i])
                  usersIDs.push(location.userId);
              }
            }
          }
        });
        console.log(usersIDs);
        User.findAll({
          where: {
            id: {
              [Op.in]: usersIDs,
            },
          },

          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "last_login",
              "device_id",
              "session_key",
              "expiredAt",
              "code",
              "password",
              "inner_role",
            ],
          },
        }).then((users) => {
          if (!users) {
            res.status(200).json({
              success: false,
              message: "No Users working in the specific location",
            });
          } else {
            res.status(200).json({
              success: true,
              users: users,
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};

/* Get all categories */
exports.exportAllCategories = (req, res) => {
  Category.findAll({
    where: {
      is_accepted: 1,
      is_deleted: 0,
    },
  })
    .then((categories) => {
      res.status(200).json({
        data: categories,
        success: false,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
};

/* Get all sub-categories */
exports.exportAllSubCategories = (req, res) => {
  SubCategory.findAll({
    where: {
      is_accepted: 1,
      is_deleted: 0,
    },
  })
    .then((sub) => {
      res.status(200).json({
        data: sub,
        success: false,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
};

/* Get all sub-categories */
exports.exportAllServices = (req, res) => {
  Service.findAll({
    where: {
      is_accepted: 1,
      is_deleted: 0,
    },
  })
    .then((services) => {
      res.status(200).json({
        data: services,
        success: false,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
};

/* Get all pending services */
exports.exportAllPendingServices = (req, res) => {
  Service.findAll({
    where: {
      is_accepted: 0,
      is_deleted: 0,
    },
    include: [
      {
        model: db.sub_categories,
        include: [
          {
            model: db.categories,
          },
        ],
      },
    ],
  })
    .then((services) => {
      res.status(200).json({
        data: services,
        success: false,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
};

/* Suggest new categorie / sub categorie / services */
exports.suggestNewService = (req, res) => {
  if (req.body.new_catg) {
    Category.create({
      name: req.body.category,
      languages: {
        name_en: req.body.category,
        name_fr: req.body.category,
        name_de: req.body.category,
      },
      is_accepted: false,
      is_deleted: false,
      most_relevent: 0,
      suggestedBy: req.body.suggestedBy,
    })
      .then((new_category) => {
        SubCategory.create({
          name: req.body.sub_catg,
          languages: {
            name_en: req.body.sub_catg,
            name_fr: req.body.sub_catg,
            name_de: req.body.sub_catg,
          },
          is_accepted: false,
          is_deleted: false,
          categoryId: new_category.id,
          most_relevent: 0,
          suggestedBy: req.body.suggestedBy,
        })
          .then((sub) => {
            res.status(200).json({
              message: "New field of business was added successfully",
              success: true,
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err.message,
              success: false,
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
          success: false,
        });
      });
  } else {
    SubCategory.create({
      name: req.body.sub_catg,
      languages: {
        name_en: req.body.sub_catg,
        name_fr: req.body.sub_catg,
        name_de: req.body.sub_catg,
      },
      is_accepted: false,
      is_deleted: false,
      categoryId: req.body.category,
      most_relevent: 0,
      suggestedBy: req.body.suggestedBy,
    })
      .then((sub) => {
        res.status(200).json({
          message: "New field of business was added successfully",
          success: false,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
          success: false,
        });
      });
  }
};

exports.architectureCategories = (req, res) => {
  Category.findAll({
    where: {
      is_accepted: 1,
      is_deleted: 0,
    },

    include: [
      {
        model: db.sub_categories,
        where: { is_accepted: 1, is_deleted: 0 },
        include: [
          {
            model: db.services,
            where: { is_accepted: 1, is_deleted: 0 },
          },
        ],
      },
    ],
  })
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

/* Get all  services by subc */
exports.allservicesKeys = (req, res) => {
  SubCategory.findAll({
    where: {
      is_accepted: 1,
      is_deleted: 0,
      categoryId: req.body.categoryId,
    },
    include: [
      {
        model: db.services,
        where: { is_accepted: 1, is_deleted: 0 },
      },
    ],
  })
    .then((services) => {
      res.status(200).json({
        data: services,
        success: false,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
};
