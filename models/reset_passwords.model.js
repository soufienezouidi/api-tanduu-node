module.exports = (sequelize, Sequelize) => {
    const ResetPassword = sequelize.define("reset_passwords", {
    email: {
        type: Sequelize.STRING
      },
      expiration: {
        type: Sequelize.DATE
      },
      token:{
          type:Sequelize.STRING,
      },
      
      used:{
          type: Sequelize.BOOLEAN
      }

    });
  
    return ResetPassword;
  };
  