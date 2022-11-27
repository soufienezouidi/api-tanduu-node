const { keywords, sub_categories } = require("../../models");
const db = require("../../models");
const ServiceKey = db.services_keywords;
const Services = db.services;

exports.getAllKeyWords = (req, res) => {
  ServiceKey.findAll({
    include: [
      {
        model: db.services,
        as: "service",
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
      },
    ],
  })
    .then((serviceKey) => {
      res.status(200).json({
        keywords: serviceKey,
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
        success: false,
      });
    });
};

exports.getKeysByServiceId = (req, res) => {
  ServiceKey.findOne({
    where: {
      serviceId: req.body.serviceId,
    },
    include: [
      {
        model: db.services,
        as: "service",
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
      },
    ],
  })
    .then((keywords) => {
      if (!keywords) {
        res.status(200).json({
          message: "keywords not found",
          success: false,
        });
      } else {
        res.status(200).json({
          keywords: keywords,
          success: true,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
        success: false,
      });
    });
};

exports.createKeywords = (req, res) => {
  ServiceKey.findOne({
    where: {
      serviceId: req.body.serviceId,
    },
    include: [
      {
        model: db.services,
        as: "service",
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
      },
    ],
  }).then((data) => {
    if (data) {
      data
        .update(req.body)
        .then((keywords) => {
          res.status(200).json({
            keywords: keywords,
            success: true,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
            success: false,
          });
        });
    } else {
      ServiceKey.create(req.body)
        .then((keyword) => {
          res.status(200).json({
            keywords: keywords,
            success: true,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
            success: false,
          });
        });
    }
  });
};
