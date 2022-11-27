const db = require("../models");
const User = db.user;
const Bankaccount = db.bank_accounts;


/* Get Bank accounts By User ID */
exports.getBankAccountsByUserId = (req, res) => {
    Bankaccount.findAll({
        where: {
            userId: req.body.userId,
            is_deleted: 0
        },

    }).then(bankaccounts => {
        if (!bankaccounts) {
            res.status(200).json({
                message: "Bank account not found with userId " + req.body.userId
            })
        }
        else {
            res.status(200).json(bankaccounts)
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    }) // end
};
exports.updateBankAccountByUser = (req, res) => {
    Bankaccount.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(bankaccount => {
        if (!bankaccount) {
            res.status(200).json({
                message: "user not found",
                success: false
            })
        } else {
            res.status(200).json({
                message: "user's bank account details were updated successfully",
                success: true
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })


};


exports.addBankAccount = (req, res) => {
    User.findOne({
        where: {
            id: req.body.userId
        }
    }).then(user => {
        if (user) {
            Bankaccount.create(
                req.body
            ).then(bankaccount => {
                if (!bankaccount) {
                    res.status(200).json({
                        success: true,
                        message: "User with " + req.body.userId + " not found"
                    })
                }
                else {
                    res.status(200).json({
                        success: true,
                        message: "bank account created success"
                    })
                }
            }).catch(err => {
                res.status(500).json({
                    success: false,
                    message: err.message
                })
            });
        } else {
            res.status(200).json({
                success: false,
                message: "User not found"
            })
        }
    }
    )

};


