const db = require("../models");
const Chat_Company = db.chat_company;
const Users = db.user;
const group_chats = db.group_chats;
const Op = require("sequelize")

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
const fs = require('fs');
const path = require('path');
const sequelize = require("sequelize");
exports.getchatfilebyidcompany = (req, res) => {


    Chat_Company.findOne({
        where: {
            id_company: req.body.id_company
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

};

exports.createteamfilelog = (req, res) => {

    Chat_Company.findOne({
        where: {
            filename: req.body.id_company + "conv",
        }
    }).then(cht2 => {
        if (!cht2) {
            Chat_Company.create({
                id_company: req.body.id_company,
                chattopic: req.body.id_company + "conv",
                filename: req.body.id_company + "conv",
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

};
exports.getConversationPath = (req, res) => {
    const type = req.params.type;
    const fileName = req.params.name;
    let conversation = fs.readFileSync('./public/conversations/' + type + '/' + fileName)
    res.status(200).send(conversation);
}

exports.createGroupChat = (req, res) => {

    group_chats.findOne({
        where: {
            file_name: req.body.companyId + "conv",
        }
    }).then(cht2 => {
        if (!cht2) {
            group_chats.create({
                companyId: req.body.companyId,
                room_name: req.body.companyId + "conv",
                file_name: req.body.companyId + "conv",
                members: req.body.members,
                is_deleted: false

            }).then(data => {
                fs.mkdir(path.join('./public/conversations/', data.file_name), (err) => {
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
                message: "chat group log already exist",
                success: false
            });
        }
    })

};

exports.getGroupChatByUser = (req, res) => {
    var array = new Array();
    Users.findOne({
        where: {
            id: req.body.userId
        }
    }).then(user => {
        if (user) {
            group_chats.findAll({
                include: [{
                    model: db.companies
                }]
            }).then(groups => {
                if (groups) {

                    groups.forEach((element) => {
                        //const found = array.some(elem => elem.id = element.members)
                        //if (element.members.contains(user)) {
                        element.members.forEach((member) => {
                            if (member.id == user.id) {
                                const found = array.some(elem => elem.id = element.id);
                                if (!found) {

                                    array.push(element)
                                    console.log(array)
                                }

                            }

                        })

                    })
                    res.status(200).json({
                        groups: array,
                        success: true
                    })
                } else {
                    res.status(200).json({
                        groups: array,
                        success: false
                    })
                }
            });
        } else {
            res.status(200).json({
                message: "User not found",
                success: false
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })



};

exports.getAllRooms = (req, res) => {
    group_chats.findAll({
        attributes: ["room_name"]
    }).then(rooms => {
        if (!rooms) {
            res.status(200).json({
                message: "No rooms found",
                success: false
            })
        } else {
            res.status(200).json({
                rooms: rooms,
                success: false
            })
        }
    });
}