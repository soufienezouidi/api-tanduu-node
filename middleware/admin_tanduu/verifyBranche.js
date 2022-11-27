const db = require("../../models");
const ROLES = db.ROLES;
const Branche = db.branches;

checkDuplicateBrancheEmail = (req, res, next) => {

  // Email
  Branche.findOne({
    where: {
      company_mail: req.body.company_mail
    }
  }).then(branche => {
    if (branche) {
      res.status(200).json({
        message: "Branche already exists",
        success: false
      });

    }

    next();
  });

};

checkDuplicateBrancheName = (req, res, next) => {

    // Email
    Branche.findOne({
      where: {
        branche_name: req.body.branche_name
      }
    }).then(branche => {
      if (branche) {
        res.status(200).json({
          message: "Branche already exists",
          success: false
        });
  
      }
  
      next();
    });
  
  };

  checkDuplicateBrancheCompanyName = (req, res, next) => {

    // Email
    Branche.findOne({
      where: {
        company: req.body.company_name
      }
    }).then(branche => {
      if (branche) {
        res.status(200).json({
          message: "Branche already exists",
          success: false
        });
  
      }
  
      next();
    });
  
  };

const verifyBranche = {
  checkDuplicateBrancheCompanyName: checkDuplicateBrancheCompanyName,
  checkDuplicateBrancheEmail: checkDuplicateBrancheEmail,
  checkDuplicateBrancheName: checkDuplicateBrancheName,
};

module.exports = verifyBranche;