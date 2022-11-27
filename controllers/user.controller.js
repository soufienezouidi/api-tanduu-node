const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const { Op } = require("sequelize");
var fs = require("fs");
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
var geoip = require("geoip-lite");
const RequestIp = require("@supercharge/request-ip");
var ipLocation = require("ip-location");
var geolocate = require("ip-geolocate");

exports.getUserById = (req, res) => {
    User.findOne({
        where: {
            id: req.body.id,
        },
    }).then((user) => {
        if (!user) {
            res.status(200).json({
                message: "User not found",
                success: false,
            });
        } else {
            res.status(200).json({
                message: user,
                success: true,
            });
        }
    });
};

exports.getUser = (req, res) => {
    User.findOne(req.body).then((user) => {
        if (!user) {
            res.status(200).json({
                message: "User not found",
                success: false,
            });
        } else {
            res.status(200).json({
                user: user,
                success: true,
            });
        }
    });
};

exports.getUserByLink = (req, res) => {
    User.findOne({
        where: {
            user_link: req.body.link,
        },
    }).then((user) => {
        if (!user) {
            res.status(200).json({
                message: "User not found",
                success: false,
            });
        } else {
            res.status(200).json({
                data: user,
                success: true,
            });
        }
    });
};

exports.getuserphotopath = (req, res) => {
    const type = req.params.type;
    const comp = req.params.company;
    const fileName = req.params.name;
    let profilepic = fs.readFileSync(
        "./public/images/user/user" + type + "/company" + comp + "/" + fileName
    );
    res.status(200).send(profilepic);
};

exports.userPic = (req, res) => {
    const id = req.params.userId;
    const fileName = req.params.name;
    let profilepic = fs.readFileSync(
        "./public/users/user" + id + "/profile pictures/" + fileName
    );
    res.status(200).send(profilepic);
};


exports.userPicCover = (req, res) => {
    const id = req.params.userId;
    const fileName = req.params.name;
    let profilepic = fs.readFileSync(
        "./public/users/user" + id + "/cover pictures/" + fileName
    );
    res.status(200).send(profilepic);
};

exports.getDefaultPicture = (req, res) => {
    const fileName = req.params.name;
    let profilepic = fs.readFileSync(
        "./public/images/" + fileName
    );
    res.status(200).send(profilepic);
};
exports.getDefaultCover = (req, res) => {
    const fileName = req.params.name;
    let profilepic = fs.readFileSync(
        "./public/images/" + fileName
    );
    res.status(200).send(profilepic);
};

exports.getLogo = (req, res) => {
    const fileName = req.params.name;
    let profilepic = fs.readFileSync(
        "./public/images/og/" + fileName
    );
    res.status(200).send(profilepic);
};
/* update user */

exports.updateuser = (req, res) => {
    User.findOne({
            where: {
                // username: req.body.username,
                id: req.body.id,
            },
        })
        .then((userFound) => {
            if (!userFound) {
                res.status(200).json({
                    message: "User not found",
                    success: false,
                });
            } else {
                User.update(req.body, {
                        where: {
                            id: req.body.id,
                        },
                    })
                    .then((num) => {
                        if (num) {
                            res.send({
                                message: "user was updated successfully.",
                            });
                        } else {
                            res.send({
                                message: `Cannot update user with id=${id}. `,
                            });
                        }
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: "Error updating user with id " + id,
                        });
                    });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
                success: false,
            });
        });
};

exports.getuserlocation = (req, res) => {
    const ip = RequestIp.getClientIp(req);
    console.log(ip);
    console.log(geoip.lookup(ip));
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.partnerBoard = (req, res) => {
    res.status(200).send("Partner Content.");
};

exports.jobberBoard = (req, res) => {
    res.status(200).send("Jobber Content.");
};

exports.customerBoard = (req, res) => {
    res.status(200).send("Customer Content.");
};

exports.superAdminBoard = (req, res) => {
    res.status(200).send("Super Admin Content.");
};

exports.tanduuBoard = (req, res) => {
    res.status(200).send("Tanduu Content.");
};