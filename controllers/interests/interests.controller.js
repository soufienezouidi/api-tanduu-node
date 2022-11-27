const db = require("../../models");
const Interest = db.interests;
const User = db.user;
var fs = require("fs");

/* create new interests */
exports.createInterest = (req, res) => {
    Interest.create(req.body).then(interest => {
            res.status(200).json({
                interest: interest,
                success: true,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            });
        });
}


/* update interest */
exports.updateInterest = (req, res) => {
    Interest.update(req.body, {
            where: {
                id: req.body.id,
            },
        }).then(interest => {
            if (!interest) {
                res.status(200).json({
                    message: "interest not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    interest: interest,
                    success: true,
                });
            }

        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            });
        });
}

/* get all interests list */

exports.getAllInterests = (req, res) => {
    Interest.findAll({
        where: {
            is_accepted: 1
        }
    }).then(interests => {
        res.status(200).json({
            interests: interests,
            success: true,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    });
}

/* get interest by Id  */

exports.getInterestById = (req, res) => {
    Interest.findOne({
        where: {
            id: req.body.id
        }
    }).then(interest => {
        res.status(200).json({
            interest: interest,
            success: true,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    });
}

/* associate interests to user */
exports.associateInterests = (req, res) => {
    User.update(req.body, {
            where: {
                id: req.body.userIid,
            },
        }).then(user => {
            if (!user) {
                res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    user: user,
                    success: true,
                });
            }

        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            });
        });
}

exports.getInterestPic = (req, res) => {
    const fileName = req.params.name;
    let pic = fs.readFileSync(
        "./public/images/interests/" + fileName
    );
    res.status(200).send(pic);
};