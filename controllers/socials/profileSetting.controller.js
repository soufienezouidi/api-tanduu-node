const db = require('../../models');
const ProfileSetting = db.profile_settings;
const User = db.user;
const nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var fs = require("fs");
var smtpTransport = require("nodemailer-smtp-transport");
var readFile = require('../../config/mailServer.config');
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
var readHTMLFile = function(path, callback) {
    fs.readFile(
        path, {
            encoding: "utf-8",
        },
        function(err, html) {
            if (err) {
                throw err;
                callback(err);
            } else {
                callback(null, html);
            }
        }
    );
};
/* profile settings of user */
exports.profileSettingsUser = (req, res) => {
    ProfileSetting.findOne({
            where: {
                userId: req.body.id
            },
            include: [{
                model: db.user,
                as: "user"
            }]
        })
        .then(settings => {
            res.status(200).json(settings);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get settings of company */
exports.profileSettingsCompany = (req, res) => {
    ProfileSetting.findOne({
            where: {
                companyId: req.body.id
            },
            include: [{
                model: db.companies,
                as: "company"
            }]
        })
        .then(settings => {
            res.status(200).json(settings);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* update settings */
exports.updateSettings = (req, res) => {
    ProfileSetting.update(req.body, {
            where: {
                id: req.body.id,
            },
        }).then(settings => {
            if (!settings) {
                res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    settings: settings,
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
}

/* update settings */
exports.createSettings = (req, res) => {
    ProfileSetting.create(req.body).then(settings => {
            if (!settings) {
                res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    settings: settings,
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
}

/* update settings */
exports.sendCodeEamil = (req, res) => {
    User.findOne({
            where: {
                id: req.body.id
            }
        }).then(user => {
            if (!user) {
                res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            } else {
                const myDate = new Date();
                myDate.setHours(myDate.getHours() + 3);
                let code = Math.floor(100000 + Math.random() * 900000);
                user.code = code;
                user.expiredAt = myDate;
                user.save();
                readHTMLFile(
                    "./templates/add_mail.html",
                    function(err, html) {
                        var template = handlebars.compile(html);
                        var replacements = {
                            fullname: user.first_name + " " + user.last_name,
                            code: user.code,
                            expiredAt: user.expiredAt,
                        };
                        var htmlToSend = template(replacements);
                        var mailOptions = {
                            from: "Tanduu team <no-reply@tanduu.com>",
                            to: req.body.email,
                            subject: "Security code",
                            html: htmlToSend,
                        };
                        smtpTransport.sendMail(
                            mailOptions,
                            function(error, response) {
                                if (error) {
                                    // callback(error);
                                }
                            }
                        );
                    }
                );
                res.status(200).json({
                    settings: user,
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
}

/* send code to add new email */