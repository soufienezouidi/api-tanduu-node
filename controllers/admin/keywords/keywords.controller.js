const {
    keywords
} = require("../../../models");
const db = require("../../../models");
const Keywords = db.keywords;

/* add new keyword */
exports.createKeywords = (req, res) => {

    keywords.findOne({
        where: {
            referenceId: req.body.referenceId,
            type: req.body.type
        }

    }).then(data => {
        if (data) {
            data.update(req.body).then(keywords => {
                res.status(200).json({
                    keyword: keywords,
                    success: true
                })
            }).catch(err => {
                res.status(500).send({
                    message: err.message,
                    success: false
                });
            });
        } else {
            keywords.create(req.body).then(keyword => {
                res.status(200).json({
                    keyword: keywords,
                    success: true
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message,
                    success: false
                });
            })
        }
    })
}


/* update keyword */

exports.updateWord = (req, res) => {

    keywords.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(keyword => {
        if (keyword)
            res.status(200).json({
                keyword: keyword,
                success: true
            });
        else
            res.send({
                message: `Cannot update keyword!`,
                success: false
            });
    }).catch(err => {
        res.status(500).send({
            message: err.message,
            success: false
        });
    })
}

/* get key words by reference id */

exports.getAllKeywordsByReferenceId = (req, res) => {

    Keywords.findAll({
        where: {
            referenceId: req.body.referenceId,
            type: req.body.type
        }
    }).then(keyword => {
        res.status(200).json({
            keyword: keyword,
            success: true
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message,
            success: false
        });
    })
}
exports.getAllKeywordsByType = (req, res) => {

    Keywords.findAll({
        where: {
            type: req.body.type
        }
    }).then(keyword => {
        res.status(200).json({
            keyword: keyword,
            success: true
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message,
            success: false
        });
    })
}
exports.getAllKeywordsForCompanies = (req, res) => {

    Keywords.findAll().then(keyword => {
        res.status(200).json({
            keyword: keyword,
            success: true
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message,
            success: false
        });
    })
}