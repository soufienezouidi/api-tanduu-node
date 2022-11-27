const db = require("../../models");
const Sequelize = require('sequelize');
const fileUpload = require('express-fileupload');
const Express_services = db.express_services;

const nodemailer = require("nodemailer");
const crypto = require('crypto');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
const users_sessionsModel = require("../../models/users_sessions.model");
const {
    User
} = require("loopback");
const {
    express_services
} = require("../../models");



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


/*----------------------------------------*/
/* GET ALL CATEGORIES */
exports.getallexpressservices = (req, res) => {
    Express_services.findAll()
        .then(expresss => {
            res.status(200).json(expresss)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};

/*--------------------------------------------*/
/* ADD NEW CATEGORY */

exports.addNewexpress = (req, res) => {

    var s = Express_services.findOne({
            where: {
                name: req.body.name_en
            }
        }).then(express => {
            if (express) {
                res.status(200).json({
                    success: false,
                    message: "express service is already exist."
                });
            } else {
                Express_services.create({
                    name: req.body.name_en,
                    is_deleted: 0,
                    is_accepted: 1,
                    most_relevent: 0,
                    languages: {
                        'name_en': req.body.name_en,
                        'name_fr': req.body.name_fr,
                        'name_de': req.body.name_de
                    }

                }).then(data => {

                    res.status(200).json({
                        success: true,
                        express: data
                    });

                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};


/*--------------------------------------------*/
/* EDIT CATEGORY */
exports.updateexpress = (req, res) => {
    Express_services.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(categ => {
        if (!categ) {
            res.status(200).json({
                message: "express not found",
                success: false
            })
        } else {
            res.status(200).json({
                message: "express  was updated successfully",
                success: true
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
};
exports.editexpressservice = (req, res) => {

    var sss = Express_services.findOne({
            where: {
                id: req.body.exp_id
            }
        })
        .then(express => {
            if (!express) {
                res.status(200).json({
                    success: false,
                    message: "Express service not found"
                });
            } else {
                express.update({
                    name: req.body.name_en,
                    languages: {
                        'name_en': req.body.name_en,
                        'name_fr': req.body.name_fr,
                        'name_de': req.body.name_de
                    }

                }).then(data => {

                    res.status(200).json({
                        success: true,
                        categorie: data
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};


/*--------------------------------------------*/
/* ENABEL DISABLE CATEGORY */
exports.enableexpress = (req, res) => {

    Express_services.findOne({
            where: {
                id: req.body.exp_id
            }
        })
        .then(express => {
            if (express) {
                res.status(200).json({
                    message: "express service not found",
                    success: false
                })
            } else {
                express.is_deleted = req.body.is_deleted;
                express.save();
                if (req.body.is_deleted) {
                    res.status(200).json({
                        message: "express service was disabled successfully",
                        success: true
                    })
                } else {
                    res.status(200).json({
                        message: "express service was enabled successfully",
                        success: true
                    })
                }
            }
        });
}

/*--------------------------------------------*/
/* ACCEPT CATEGORY */

exports.acceptexpressservice = (req, res) => {

    var exp = Express_services.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(express => {
            if (!express) {
                res.status(200).json({
                    success: false,
                    message: "Express service not found"
                });
            } else {
                express.update({
                    is_accepted: req.body.is_accepted,
                }).then(data => {
                    res.status(200).json({
                        success: true,
                        express: data
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};