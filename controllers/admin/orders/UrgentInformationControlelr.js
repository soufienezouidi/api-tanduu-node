const db = require("../../../models");
const Sequelize = require('sequelize');
const Orders = db.orders;
const Information = db.company_urgent_informations;


/* GET ALL URGENT INFORMATION  */
exports.getAllUrgentInformations = (req, res) => {
    Information.findOne({
        where: {
            companyId: req.body.company_id
        },
        include: [{
            model: db.companies
        }]
    }).then(informations => {
        res.status(200).json(informations);
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
};

/* CREATE NEW INFORMATION */
exports.createOrUpdateInformation = (req, res) => {
    Information.findOne({
        where: {
            companyId: req.body.company_id
        }
    }).then(information => {
        if (!information) {
            Information.create({
                companyId: req.body.company_id,
                informations: req.body.information
            }).then(newInformation => {
                res.status(200).json({
                    information: newInformation,
                    success: true
                })

            }).catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })

        }
        else {
            information.update(req.body, {
                informations: req.body.information
            }).then(info => {
                res.status(200).json({
                    info: info,
                    success: true
                })

            }).catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
        }
    })
};
