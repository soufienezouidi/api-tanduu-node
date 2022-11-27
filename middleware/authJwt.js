const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;


/* VERIFY TOKEN */
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(200).send({
      message: "you are not connected. please log in to continue."
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {

    if (err) {
      return res.status(200).send({
        message: "Access denied. Please log in to continue use Tanduu"
      });
    }
    req.userId = decoded.id;
    next();
  });
};


/* CHECK ADMIN TOKEN */
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(200).json({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

/* CHECK JOBBER TOKEN */
isJobber = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "jobber") {
          next();
          return;
        }
      }
      res.status(200).json({
        message: "Require Jobber Role!"
      });
    });
  });
};

/* CHECK CUSTOMER TOKEN */
isCustomer = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "customer") {
          next();
          return;
        }
      }
      res.status(200).json({
        message: "Require customer Role!"
      });
    });
  });
};


/* check partner account */
isPartner = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "partner") {
          next();
          return;
        }
      }

      res.status(200).josn({
        message: "Require Partner Role!"
      });
    });
  });
};

/* CHECK SUPER ADMIN TOKEN */
isSuperAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "super_admin") {
          next();
          return;
        }
      }

      res.status(200).josn({
        message: "Require Super Admin Role!"
      });
    });
  });
};

/* CHECK TANDUU ADMIN TOKEN */
isTanduu = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "tanduu_admin") {
          next();
          return;
        }
      }

      res.status(200).josn({
        message: "Require Tanduu Role!"
      });
    });
  });
};

/* CHECK COMMERCIAL TOKEN */
isCommercial = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "commercial") {
          next();
          return;
        }
      }

      res.status(200).josn({
        message: "Require Commercial Role"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isPartner: isPartner,
  isCustomer: isCustomer,
  isJobber: isJobber,
  isSuperAdmin: isSuperAdmin,
  isTanduu: isTanduu,
  isCommercial: isCommercial
};
module.exports = authJwt;