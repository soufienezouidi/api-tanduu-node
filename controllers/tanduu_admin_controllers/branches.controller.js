const db = require("../../models");
const Sequelize = require('sequelize');
const fileUpload = require('express-fileupload');
const {
    branches
} = require("../../models");
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const crypto = require('crypto');
var handlebars = require('handlebars');
var fs = require('fs');
const {
    User
} = require("loopback");
const Op = Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {
    Session
} = require("inspector");
const Branche = db.branches;
const Users = db.user;


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

/* GET ALL BRANCHES */
exports.getAllBranches = (req, res) => {
    Branche.findAll()
        .then(branche => {
            res.status(200).json(branche)
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
};

/* ADD NEW BRANCHE */
exports.addBranche = (req, res) => {
    Branche.create({
            company: req.body.company,
            company_mail: req.body.mail,
            country: req.body.country,
            branche_name: req.body.branche_name,
            is_enabled: 1,
            is_deleted: 0,
            userId: req.body.user_id
        })
        .then(branche => {
            Users.findOne({
                where: {
                    id: req.body.user_id
                }
            }).then(user => {
                var password = "angtnd" + crypto.randomBytes(4).toString('hex');

                branche.password = bcrypt.hashSync(password, 8);
                branche.save();
                readHTMLFile('./templates/new_branche.html', function (err, html) {
                    var template = handlebars.compile(html);
                    var replacements = {
                        fullname: user.first_name + " " + user.last_name,
                        branche: branche.branche_name,
                        email: branche.company_mail,
                        password: password
                    };
                    var htmlToSend = template(replacements);
                    var mailOptions = {
                        to: user.email,
                        subject: 'New Branche was created',
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
                    message: "New branche was added successfully"
                })
            })
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
};


/* ADD NEW BRANCHE */
exports.editBranche = (req, res) => {
    Branche.findOne({
            where: {
                id: req.body.branche_id
            }
        })
        .then(branche => {
            if (!branche) {
                res.status(200).json({
                    success: false,
                    message: "Branche not found"
                })
            } else {
                branche.company_name = req.body.company_name;
                branche.company_mail = req.body.mail;
                branche.country = req.body.country;
                branche.branche_name = req.body.branche_name
                branche.save();
                Users.find
                Users.findOne({
                    where: {
                        id: branche.userId
                    }
                }).then(user => {
                    var password = "angtnd" + crypto.randomBytes(4).toString('hex');

                    branche.password = bcrypt.hashSync(password, 8);
                    branche.save();
                    readHTMLFile('./templates/new_branche.html', function (err, html) {
                        var template = handlebars.compile(html);
                        var replacements = {
                            fullname: user.first_name + " " + user.last_name,
                            branche: branche.branche_name,
                            email: branche.company_mail,
                            password: password
                        };
                        var htmlToSend = template(replacements);
                        var mailOptions = {
                            to: user.email,
                            subject: 'New Branche was updated',
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
                        message: "Branche was updated successfully"
                    })
                });
            }

        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
};


/* ENABLE / DISABLE BRANCHE */

exports.enableBranche = (req, res) => {
    Branche.findOne({
            where: {
                id: req.body.branche_id
            }
        })
        .then(branche => {
            if (!branche) {
                res.status(200).json({
                    success: false,
                    message: "Branche not found"
                })
            } else {
                if (branche.is_enabled) {

                    branche.is_enabled = req.body.is_enabled;
                    branche.save();
                    res.status(200).json({
                        enabled: false,
                        message: "Branche was Disabled successfully"
                    })
                } else {
                    branche.is_enabled = req.body.is_enabled;
                    branche.save();
                    res.status(200).json({
                        enabled: true,
                        message: "Branche was Enabled successfully"

                    })
                }

            }

        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        })
};

/* DELETE BRANCHE */

exports.deleteBranche = (req, res) => {
    Branche.findOne({
            where: {
                id: req.body.branche_id
            }
        })
        .then(branche => {
            if (!branche) {
                res.status(200).json({
                    success: false,
                    message: "Branche not found"
                })
            } else {
                branche.is_deleted = 1
                branche.save();
                res.status(200).json({
                    success: true,
                    message: "Branche was deleted successfully"
                })
            }
        }).catch(err => {
            res.status(200).json({
                message: err.message
            })
        })
};