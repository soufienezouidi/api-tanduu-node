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
const Descriptions = db.descriptions;

exports.adddescription = (req, res) => {

    Descriptions.create({
        category_id: req.body.id,
        en: req.body.en,
        fr: req.body.fr,
        de: req.body.de,
      
    })
        .then(blogs => {
            res.status(200).json({
                success: true,
                categorie: blogs
            });

        }).catch(err => {
            res.status(500).json({
                success: false,
                message: err.message
            })

        });
};
exports.getdescriptionbycategoryid = (req, res) => {
    Descriptions.findOne({
        where: {
            category_id: req.body.id
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
exports.updatedescription = (req, res) => {
    Descriptions.findOne({
        where: {
            category_id: req.body.id
        },
      
        
      }).then((data) => {
        if (data) {
          data
            .update(req.body)
            .then((keywords) => {
              res.status(200).json({
                keywords: keywords,
                success: true,
              });
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message,
                success: false,
              });
            });
        } else {
           
    Descriptions.create({
        category_id: req.body.id,
        en: req.body.en,
        fr: req.body.fr,
        de: req.body.de,
      
    })
            .then((keyword) => {
              res.status(200).json({
                keywords: keywords,
                success: true,
              });
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message,
                success: false,
              });
            });
        }
      });
 
};