const db = require("../../models");
const Commercials = db.commercial;
const User = db.user;
const Commercial_feed = db.commercial_feed;
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var handlebars = require("handlebars");
var fs = require("fs");

const Role = db.role;
/* CONFIGURATION MAIL SERVER */
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "0c82ad1e88768e",
    pass: "3d00f12dbeeb84",
  },
});
smtpTransport = nodemailer.createTransport(
  smtpTransport({
    host: "mail.tanduu.com",
    port: 25,
    auth: {
      user: "no-reply@tanduu.com",
      pass: "gidsEnyitatAd6!./",
    },
  })
);

/*----------------------------------------*/

/* FUNCTION TO READ FILE */

var readHTMLFile = function (path, callback) {
  fs.readFile(
    path,
    {
      encoding: "utf-8",
    },
    function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    }
  );
};

/*-------------------------------------------------- */

/*----------------------------------------*/
/* GET COMMERCIAL */
exports.addNewCommercial = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(200).json({
        message: "email alreaduy exist",
        success: false,
      });
    } else {
      User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        is_active: 1,
        is_verified: 1,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        is_completed: 1,
      }).then((user) => {
        Role.findAll({
          where: {
            name: "commercial",
          },
        })
          .then((roles) => {
            user.setRoles(roles).then(() => {
              Commercials.create({
                userId: user.id,
                phone: req.body.phone,
                is_deleted: 0,
                is_completed: 0,
                code: req.body.code,
                provision_out: req.body.provision,
                password: req.body.password,
              })
                .then((commercial) => {
                  readHTMLFile(
                    "./templates/commercial_mail.html",
                    function (err, html) {
                      var template = handlebars.compile(html);
                      var replacements = {
                        fullname: user.first_name + " " + user.last_name,
                        code: req.body.code,
                        email: user.email,
                        password: req.body.password,
                      };
                      var htmlToSend = template(replacements);
                      var mailOptions = {
                        from: "Tanduu <no-reply@tanduu.com>",
                        to: req.body.personal_email,
                        subject: "Commercial account details",
                        html: htmlToSend,
                      };
                      smtpTransport.sendMail(
                        mailOptions,
                        function (error, response) {
                          if (error) {
                            callback(error);
                          }
                        }
                      );
                    }
                  );
                  res.status(200).json({
                    message: "Commercial account was added successfully",
                    success: true,
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    message: err.message,
                    success: false,
                  });
                });
            });
          })

          .catch((err) => {
            res.status(500).json({
              message: err.message,
            });
          });
      });
    }
  });
};
