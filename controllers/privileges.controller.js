const db = require("../models");
const privileges = db.privileges;

exports.getPrivilegesByUser = (req, res) => {
    privileges.findOne({
        where: {
            userId: req.body.userId
        }
    }).then(p => {
        if (!p) {
            res.status(200).json({
                message: "No privileges were found",
                success: false
            })
        } else {
            res.status(200).json({
                privileges: p,
                success: true
            })
        }
    }).catch(e => {
        res.status(500).json({
            message: e.message,
            success: false
        })
    })
}