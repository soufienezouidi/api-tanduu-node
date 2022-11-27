const nodemailer = require("nodemailer");
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
    host: "mail.tanduu.com",
    port: 25,
    auth: {
        user: "no-reply@tanduu.com",
        pass: "gidsEnyitatAd6!./" // password
    }
}));

/*----------------------------------------*/


/* FUNCTION TO READ FILE */

readHTMLFile = function(path, callback) {
    fs.readFile(path, {
        encoding: 'utf-8'
    }, function(err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};

module.exports = {
    readHTMLFile: readHTMLFile,
    smtpTransport: smtpTransport,
};