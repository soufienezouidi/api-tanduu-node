const db = require("../../models");
const Sequelize = require('sequelize');
const fileUpload = require('express-fileupload');
const {
    branches,
    categories
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
const Pages = db.pages;


exports.getpagebyname = (req, res) => {
    Pages.findOne({
        where: {
            name: req.body.name
        }

    }).then(page => {
        if (!page) {
            res.status(200).json({
                message: "page not found"
            });
        } else {
            res.status(200).json(page)
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}
exports.updatepage = (req, res) => {
    Pages.update(req.body, {
        where: {
            name: req.body.name
        }
    }).then(page => {
        if (!page) {
            res.status(200).json({
                message: "page not found",
                success: false
            })
        } else {
            res.status(200).json({
                message: "page account was update successfully",
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