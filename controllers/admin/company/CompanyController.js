const db = require("../../../models");
const User = db.user;
const Company = db.companies;

/* Get Company By User ID */

exports.getCompanyByUserId = (req, res) => {
  Company.findOne({
    where: {
      userId: req.body.user_id,
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
    .then((company) => {
      if (!company) {
        res.status(200).json({
          message: "Company not found with userId " + req.body.user_id,
        });
      } else {
        res.status(200).json(company);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

/* GET COMPANY BY ID */
exports.getCompanyById = (req, res) => {
  Company.findOne({
    where: {
      id: req.body.user_id,
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
    .then((company) => {
      if (!company) {
        res.status(200).json({
          message: "Company not found with Id " + req.body.user_id,
        });
      } else {
        res.status(200).json(company);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

/* GET COMPANIES BY ID */
exports.getCompaniesById = (req, res) => {
  Company.findAll({
    where: {
      userId: req.body.user_id,
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
      if (!companies) {
        res.status(200).json({
          message: "Company not found with Id " + req.body.user_id,
          success: false,
        });
      } else {
        res.status(200).json(companies);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

/* GET COMPANY BY USERNAME */
exports.getCompanyByUsername = (req, res) => {
  Company.findOne({
    where: {
      company_link: req.body.company_link,
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
    .then((company) => {
      if (!company) {
        res.status(200).json({
          message: "User not found with username " + req.body.company_link,
          success: false,
        });
      } else {
        res.status(200).json({
          company: company,
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

/* UPDATE COMPANY */
exports.updateCompanyUser = (req, res) => {
  Company.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((company) => {
      if (company) {
        Company.update(req.body, {
          where: {
            id: req.body.id,
          },
        })
          .then((company) => {
            if (!company) {
              res.status(200).json({
                message: "user not found",
                success: false,
              });
            } else {
              res.status(200).json({
                message: "user's company details were updated successfully ",
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
      } else {
        res.status(200).json({
          success: false,
          message: "User not found",
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

exports.updateCompnyLink = (req, res) => {
  Company.findOne({
    where: {
      company_link: req.body.company_link,
      [Op.not]: [{ id: [req.body.id] }],
    },
  })
    .then((userFound) => {
      if (userFound) {
        res.status(200).json({
          message: "exist",
          success: false,
        });
      } else {
        Company.update(req.body, {
          where: {
            id: req.body.id,
          },
        })
          .then((num) => {
            if (num) {
              res.send({
                message: "company Link was updated successfully.",
                success: true,
              });
            } else {
              res.send({
                message: `Cannot update company `,
                success: false,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
              success: false,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};
