const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Company = db.companies;
const Access_keys = db.access_keys;
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.getAccessbyCode = (req, res) => {
    Access_keys.findOne({
        where: {
            code: req.body.code
        },
        include: [{
            model: db.user,
            as: "jobber"
        }, {
            model: db.companies,
            as: "company"
        }]
    }).then(access => {
        if (!access) {
            res.status(200).json({
                message: "access not found",
                success: false
            });
        } else {
            res.status(200).json({
                message: access,
                success: true
            });
        }
    })
};
exports.getAccessbyUser = (req, res) => {
    Access_keys.findOne({
        where: {
            userId: req.body.userId
        },
        include: [{
            model: db.user,
            as: "jobber"
        }, {
            model: db.companies,
            as: "company"
        }]
    }).then(access => {
        if (!access) {
            res.status(200).json({
                message: "no access  found",
                success: false
            });
        } else {
            res.status(200).json({
                message: access,
                success: true
            });
        }
    })
};
exports.getAccessbyCompany = (req, res) => {
    Access_keys.findAll({
        where: {
            companyId: req.body.companyId
        },
        include: [{
            model: db.user,
            as: "jobber"
        }, {
            model: db.companies,
            as: "company"
        }]
    }).then(access => {
        if (!access) {
            res.status(200).json({
                message: "no jobbers access found",
                success: false
            });
        } else {
            res.status(200).json({
                message: access,
                success: true
            });
        }
    })
};

/* update user */

exports.updateAccess = (req, res) => {

    Access_keys.findOne({
        where: {
            invitationId: req.body.invitationId,
        }
    })
        .then(access => {
            if (access) {
                Access_keys.update(req.body, {
                    where: {
                        id: access.id
                    }
                }).then(found => {
                    res.status(200).json({
                        message: access,
                        success: true
                    });
                }).catch(err => {
                    res.status(500).send({
                        message: "Error updating access",
                        success: false
                    });
                })

            } else {
                res.send({
                    message: `Cannot update access. Maybe Tutorial was not found or req.body is empty!`,
                    success: false
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating access ",
                success: false
            });
        });
};

/* GET ACCESS KEY BY INVITATION */

exports.getAccessTokenByInvitation = (req, res) => {
    Access_keys.findOne({
        where: {
            invitationId: req.body.invitationId,
        }
    }).then(access => {
        if (!access) {
            res.status(200).json({
                message: "no jobbers access found",
                success: false
            });
        } else {
            res.status(200).json({
                message: access,
                success: true
            });
        }
    })
}