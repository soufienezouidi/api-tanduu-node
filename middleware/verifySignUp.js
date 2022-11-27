const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((user) => {
        if (user) {
            res.status(200).json({
                message: "email already used",
                registred: false,
            });
        }
        next();
    });
};

checkDuplicateUsername = (req, res, next) => {
    // Email

    User.findOne({
        where: {
            username: req.body.username,
        },
    }).then((user) => {
        if (user) {
            res.status(200).json({
                message: "phone already used",
                registred: false,
            });
        }
        next();
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(200).send({
                    message: "Failed! Role " + req.body.roles[i] + " does not exist",
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkDuplicateUsername: checkDuplicateUsername,
    checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;