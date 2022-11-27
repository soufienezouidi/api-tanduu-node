const db = require("../../models");
const ROLES = db.ROLES;
const User = db.user;
const nodemailer = require("nodemailer");
const Sequelize = require('sequelize');
const crypto = require('crypto');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

/* CONFIGURATION MAIL SERVER */
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "0c82ad1e88768e",
        pass: "3d00f12dbeeb84"
    }
});
smtpTransport = nodemailer.createTransport(smtpTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "0c82ad1e88768e",
        pass: "3d00f12dbeeb84"
    }
}));

/*----------------------------------------*/

/* FUNCTION TO READ FILE */

var readHTMLFile = function (path, callback) {
    fs.readFile(path, {
        encoding: 'utf-8'
    }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

/*-------------------------------------------------- */

/* SEND MAIL VERIFICATION */
exports.sendMailVerification = (req, res) => {
    User.findOne({
        where: {
            id: req.body.user_id
        }
    }).then(user => {
        if (!user) {
            res.status(200).json({
                success: false,
                message: "User not found"
            })
        } else {
            const myDate = new Date();
            myDate.setHours(myDate.getHours() + 1);
            myDate.setMinutes(myDate.getMinutes() + 5);
            var code = Math.floor(100000 + Math.random() * 900000);
            user.code = code;
            user.expiredAt = myDate;
            user.save();
            readHTMLFile('./templates/tanduu_admin_verification.html', function (err, html) {
                var template = handlebars.compile(html);
                var replacements = {
                    message: "You try to enable / disable " + req.body.name + "  using ADMIN account",
                    code: user.code,
                };
                var htmlToSend = template(replacements);
                var mailOptions = {
                    to: "admin@tanduu.com",
                    subject: 'Verification code',
                    html: htmlToSend
                };
                smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {

                        callback(error);
                    }
                });
            });
            res.status(200).json({
                success: true,
                message: "was sent successfully"
            })
        }
    })
}