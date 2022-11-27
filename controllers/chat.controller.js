const db = require("../models");
const Chat = db.chat;

const {
    Op
} = require("sequelize");
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
const fs = require('fs');
const path = require('path');
const {
    includes
} = require("lodash");
exports.getchatfilebyidusers = (req, res) => {
    Chat.findOne({
        where: {
            user1: req.body.id1,
            user2: req.body.id2
        }
    }).then(cht1 => {
        if (!cht1) {
            Chat.findOne({
                where: {
                    user1: req.body.id2,
                    user2: req.body.id1
                }
            }).then(cht2 => {
                if (!cht2) {
                    res.status(200).json({
                        message: "chatlog not found",
                        success: false
                    });
                } else {
                    res.status(200).json({
                        message: cht2,
                        success: true
                    });
                }
            })
        } else {
            res.status(200).json({
                message: cht1,
                success: true
            });
        }
    })
};
exports.createfilelog = (req, res) => {
    Chat.findOne({
        where: {
            filename: req.body.id1 + "and" + req.body.id2 + "conv",

        }
    }).then(cht1 => {
        if (!cht1) {
            Chat.findOne({
                where: {
                    filename: req.body.id2 + "and" + req.body.id1 + "conv",
                }
            }).then(cht2 => {
                if (!cht2) {
                    Chat.create({
                        user1: req.body.id2,
                        user2: req.body.id1,
                        filename: req.body.id2 + "and" + req.body.id1 + "conv",
                        is_deleted: false

                    }).then(data => {
                        fs.mkdir(path.join('./public/conversations/', data.filename), (err) => {
                            if (err) {
                                return console.error(err);
                            }
                            console.log('Directory created successfully!');
                        });
                        res.status(200).json({
                            success: true,
                            file: data
                        });

                    });
                } else {
                    res.status(200).json({
                        message: "chat log already exist",
                        success: false
                    });
                }
            })
        } else {
            res.status(200).json({
                message: "chat log already exist",
                success: false
            });
        }
    })
};
exports.getConversationPath = (req, res) => {
    const type = req.params.type;
    const fileName = req.params.name;
    let conversation = fs.readFileSync('./public/conversations/' + type + '/' + fileName)
    res.status(200).send(conversation);

}

exports.getallcontacts = (req, res) => {

    Chat.findAll({
        where: {
            [Op.or]: [{
                user1: req.body.id_user,
            }, {
                user2: req.body.id_user,
            }],

        },
        include: [{
            model: db.user,
            as: "user11"
        }, {
            model: db.user,
            as: "user21"
        }]
    }).then(cht2 => {
        if (!cht2) {
            res.status(200).json({
                message: "no contact  found",
                success: false
            });
        } else {
            res.status(200).json({
                message: cht2,
                success: true
            });
        }
    })


};