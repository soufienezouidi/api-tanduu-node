const db = require("../../models");
const Sequelize = require('sequelize');
const User = db.companies;
const cust = db.customers;
exports.getallcompanies = (req, res) => {
    User.findAll({
        include: [{
            model: db.user
        }]
    }).then(users => {
        if (!users) {
            res.status(200).json({
                message: "no users found"
            });
        } else {
            res.status(200).json(users)
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}
exports.getallusers = (req, res) => {
    cust.findAll({
        include: [{
            model: db.user
        }]
    }).then(users => {
        if (!users) {
            res.status(200).json({
                message: "no users found"
            });
        } else {
            res.status(200).json(users)
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}