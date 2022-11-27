const db = require("../../models");
const Sequelize = require('sequelize');
const fileUpload = require('express-fileupload');
const {
    sub_categories
} = require("../../models");
const Location = db.locations;


exports.filterServices = (req, res) => {
    console.log(req.body.zip_code)
    console.log(req.body.services)
    Location.findAll({
        where: {
            is_active: true,
            zip_code: req.body.zip_code

        },
        include: [{
            model: db.companies,
            as: "company"
        }]
    }).then(data => {

        var services = req.body.services;
        var arr = [];

        data.map(function (location) {
            var lt = 0;

            console.log("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
            console.log(JSON.parse(location.services)[0])
            console.log("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------")

            services.forEach(element => {
                var objIndex = JSON.parse(location.services).findIndex((obj => obj.service.id == element));
                if (objIndex > -1) {
                    lt++;
                }
            })
            if (lt == services.length) {
                arr.push(location)
            }

        });
        res.send(arr)
    }).catch(err => {

    })
}

exports.filterServicesByCity = (req, res) => {
    console.log(req.body.city)
    console.log(req.body.services)
    Location.findAll({
        where: {
            is_active: true,
            city: req.body.city

        },
        include: [{
            model: db.companies,
            as: "company"
        }]
    }).then(data => {

        var services = req.body.services;
        var arr = [];

        data.map(function (location) {
            var lt = 0;

            console.log("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
            console.log(JSON.parse(location.services)[0])
            console.log("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------")

            services.forEach(element => {
                var objIndex = JSON.parse(location.services).findIndex((obj => obj.service.id == element));
                if (objIndex > -1) {
                    lt++;
                }
            })
            if (lt == services.length) {
                arr.push(location)
            }

        });
        res.send(arr)
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })

    })
}
exports.filterServicesByCity = (req, res) => {

    Location.findAll({
        where: {
            is_active: true,
            city: req.body.city

        },
        include: [{
            model: db.companies,
            as: "company"
        }]
    }).then(data => {

        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })

    })
}