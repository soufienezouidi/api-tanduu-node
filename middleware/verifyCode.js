const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkSecurityCode = (req, res, next) => {
  // check if the verification code is true
  User.findOne({
    where: {
      id: req.body.user_id
    }
  }).then(user => {
    if (!user) {
      res.status(200).json({
        message: "Use Not found",
        success: false
      });

    }
    else
    {
        if(req.body.code !== user.code)
        {
            res.status(200).json({
                message: "You entred Wrong code.",
                success: false
              });
        }
    }

    next();
  });

};

checkExpirationCode = (req, res, next) =>{

  User.findOne({
    where: {
      id: req.body.user_id
    }
  }).then(user => {
    if (!user) {
      res.status(200).json({
        message: "Use Not found",
        success: false
      });

    }
    else
    {
      const myDate = new Date();       
      myDate.setHours(myDate.getHours() + 1);
      var d2 = new Date(user.expiredAt);
      if(myDate > d2){
        res.status(200).json({
          success: false,
          message: "Code was expired."
        })
      }
    }

    next();
  });
}

const verifyCode = {
    checkSecurityCode: checkSecurityCode,
    checkExpirationCode: checkExpirationCode
  };
  
module.exports = verifyCode;