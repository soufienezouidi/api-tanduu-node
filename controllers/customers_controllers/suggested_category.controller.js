const db = require("../../models");
const suggested = db.suggested;

exports.suggestnewcategory = (req, res) => {
    suggested.create(req.body).then(categ => {
        res.status(200).json({
            category: categ,
            success: true
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message,
            success: false
        });
    })
}
exports.getsuggestionbyuser = (req, res) => {
    suggested.findAll({
        where: {
            requesterId: req.body.userId
        },


    }).then(requests => {
        if (!requests) {
            res.status(200).json({
                reqs: [],

            });
        } else {
            res.status(200).json({
                reqs: requests
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}
exports.getallsuggestions = (req, res) => {
    suggested.findAll({



    }).then(requests => {
        if (!requests) {
            res.status(200).json({
                reqs: [],

            });
        } else {
            res.status(200).json({
                reqs: requests
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}



exports.getSuggestionById = (req, res) => {
    suggested.findOne({
        where: {
            id: req.body.id
        },


    }).then(requests => {
        if (!requests) {
            res.status(200).json({
                reqs: [],

            });
        } else {
            res.status(200).json({
                reqs: requests
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}



exports.updateSuggest = (req, res) => {
    suggested.findOne({
        where: {
            id: req.body.id
        },
    }).then(request => {
        if (!request) {
            res.status(200).json({
                message: "suggestion not found",
                success: false
            });
        } else {
            request.update(req.body).then(updated => {
                res.status(200).json({
                message: "suggestion was set successfully",
                success: true
            });
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}