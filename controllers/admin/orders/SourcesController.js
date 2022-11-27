const db = require("../../../models");
const User = db.user;
const Company = db.companies;
const Sources = db.company_sources;


/* Get Company By company ID */

exports.getSourcesByCompanyId = (req, res) => {
    Sources.findOne({
        where: {
            companyId: req.body.company_id
        },
        include: [{
            model: db.companies,
            include: [{
                model: db.user
            }]
        }]
    }).then(sources => {
        if (!sources) {
            res.status(200).json({
                message: "Company not found with userId " + req.body.company_id
            })
        }
        else {
            res.status(200).json(sources)
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    })

};

/* ADD AND UPDATE SOURCE */

exports.createOrUpdateSource = (req, res) => {
    Sources.findOne({
        where: {
            companyId: req.body.company_id
        }
    }).then(source => {
        if (!source) {
            Sources.create({
                companyId: req.body.company_id,
                source_list: req.body.sources
            }).then(newSource => {
                res.status(200).json({
                    source: newSource,
                    success: true
                })

            }).catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })

        }
        else {
            source.update({
                source_list: req.body.sources
            }).then(src => {
                res.status(200).json({
                    source: src,
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