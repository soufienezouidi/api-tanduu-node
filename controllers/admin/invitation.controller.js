const {
    invitations
} = require("../../models");
const db = require("../../models");
const Invitations = db.invitations;
const Users = db.user;
const Team = db.teams;
const AccessKey = db.access_keys;
const Companies = db.companies;
const crypto = require('crypto');
const mailto = require("../../config/mailServer.config");
var handlebars = require('handlebars');
const {
    User
} = require("loopback");



/*  GET ALL INVITATION SENT */
exports.getAllInvitationSend = (req, res) => {
    Invitations.findAll({
        where: {
            senderId: req.body.user_id
        },
        include: [{
                model: db.user,
                as: "userSender"
            },
            {
                model: db.user,
                as: "userReceiver"
            }
        ]
    }).then(invitations => {
        if (!invitations) {
            res.status(200).json({
                message: "No invitations found",
                success: false
            })
        } else {
            res.status(200).json({
                invitations: invitations,
                success: false
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
}

/*  GET ALL INVITATION RECEIVED */
exports.getAllInvitationReceived = (req, res) => {
    Invitations.findAll({
        where: {
            receiverId: req.body.user_id
        },
        include: [{
                model: db.user,
                as: "userSender"
            },
            {
                model: db.user,
                as: "userReceiver"
            }
        ]
    }).then(invitations => {
        if (!invitations) {
            res.status(200).json({
                message: "No invitations found",
                success: false
            })
        } else {
            res.status(200).json({
                invitations: invitations,
                success: false
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
}


/* GET SINGLE INVITATION BY INVITATION KEY */
exports.getSingleInvitationByKey = (req, res) => {
    Invitations.findOne({
        where: {
            invitation_token: req.body.key,
        },
        include: [{
                model: db.user,
                as: "userSender"
            },
            {
                model: db.user,
                as: "userReceiver"
            }
        ]
    }).then(invitation => {
        if (!invitation) {
            res.status(200).json({
                message: "No invitation found",
                success: false
            })
        } else {
            res.status(200).json({
                invitations: invitation,
                success: true
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
}

/* SENT INVITATION TO USER ALREADY EXIST */
exports.sendInvitationToExistUser = (req, res) => {
    Users.findOne({
        where: {
            email: req.body.email,
            account_number: req.body.account_number,
        }
    }).then(receiver => {
        if (receiver) {
            Invitations.findOne({
                where: {
                    senderId: req.body.sender_id,
                    receiverId: receiver.id,
                },
                include: [{
                        model: db.user,
                        as: "userSender"
                    },
                    {
                        model: db.user,
                        as: "userReceiver"
                    }
                ]
            }).then(invitation => {
                if (!invitation) {
                    Invitations.create({
                        invitation_token: crypto.randomBytes(20).toString('hex'), // genrate invitation key
                        senderId: req.body.sender_id,
                        receiverId: receiver.id,
                        is_accepted: 0,
                        is_refused: 0,
                        is_deleted: 0,
                        email: receiver.email,
                        first_name: receiver.first_name,
                        last_name: receiver.last_name,
                        role: req.body.role,
                        code_key: Math.floor(100000 + Math.random() * 900000)
                    }).then(new_invitation => {
                        Users.findOne({
                            where: {
                                id: req.body.sender_id
                            }
                        }).then(user => {
                            mailto.readHTMLFile('./templates/sent_invitation.html', function (err, html) {
                                var template = handlebars.compile(html);
                                var replacements = {
                                    fullname: receiver.first_name + " " + receiver.last_name,
                                    code: new_invitation.invitation_token,
                                    role: req.body.role,
                                    main_comapny: new_invitation.first_name + " " + new_invitation.last_name,
                                    session_code: new_invitation.code_key
                                };
                                var htmlToSend = template(replacements);
                                var mailOptions = {
                                    to: receiver.email,
                                    subject: 'New invitation from ' + user.first_name + ' ' + user.last_name,
                                    html: htmlToSend
                                };
                                mailto.smtpTransport.sendMail(mailOptions, function (error, response) {
                                    if (error) {
                                        ;
                                        callback(error);
                                    }
                                });
                            });
                            res.status(200).json({
                                message: 'Invitation was sent successfully',
                                success: true
                            })

                        }).catch(err => {
                            res.status(500).json({
                                message: err.message,
                                success: false
                            })
                        })

                    }).catch(err => {
                        res.status(500).json({
                            message: err.message,
                            success: false
                        })
                    })
                } else {

                    if (!invitation.is_deleted && invitation.is_accepted) {
                        res.status(200).json({
                            message: 'user was already in your team',
                            success: "already accepted"
                        })
                    } else if (!invitation.is_deleted && !invitation.is_accepted) {
                        res.status(200).json({
                            message: 'you already sent invitation to this user',
                            success: "already sent"
                        })
                    } else {
                        //  TO DO
                    }
                }
            }).catch(err => {
                res.status(500).json({
                    message: err.message,
                    success: false
                })
            })
        } else {
            res.status(200).json({
                message: "User not found",
                success: "not found"
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
}


/* update invitation */
exports.acceptOrDeclineInvitation = (req, res) => {
    Invitations.findOne({
        where: {
            invitation_token: req.query.invitation_key,
            is_deleted: 0
        }
    }).then(invitation => {
        if (invitation && !invitation.is_accepted && invitation.is_refused) {
            res.status(200).json({
                message: "invitation was already declined",
                success: "already declined"
            })
        } else if (invitation && invitation.is_accepted && !invitation.is_refused) {
            res.status(200).json({
                message: "invitation was already accepted",
                success: "already accepted"
            })
        } else if (invitation && !invitation.is_accepted && !invitation.is_refused) {
            if (req.query.status == "accept") {
                invitation.is_accepted = 1;
                invitation.save();
                if (invitation.receiverId) { // check if the worker is exist
                    console.log('exist')
                    Companies.findOne({
                        where: {
                            userId: invitation.senderId,
                        }
                    }).then(company => {
                        if (company) {
                            let priv = {
                                "create_new_auftrags": false,
                                "see_sent_auftrags": false,
                                "see_received_auftrags": false,
                                "create_new_invitations": false,
                                "see_sent_invitations": false,
                                "see_members": false,
                                "see_received_invitations": false,
                                "see_calendar": true,
                                "see_customers": false,
                                "cashbook": false,
                                "balancing_list": false,
                                "file_management": false,
                                "see_invoices": false,
                                "create_invoices": false,
                                "articles": false
                            };
                            AccessKey.create({
                                code: invitation.code_key,
                                privilege: priv,
                                userId: invitation.receiverId,
                                companyId: company.id,
                                invitationId: invitation.id
                            }).then({}).catch({});
                            Team.findOne({ // find company account of the sender
                                where: {
                                    companyId: company.id
                                }
                            }).then(team => {

                                var teamArray = team.members; // get the team list of the invitation sender
                                Companies.findOne({ // check the company account of the receiver
                                    where: {
                                        userId: invitation.receiverId,
                                    },
                                    include: [{
                                        model: db.user
                                    }]
                                }).then(receiverCompany => {
                                    if (receiverCompany) {
                                        if (teamArray.length) {
                                            teamArray.push({ // push data of new member into array
                                                "id": teamArray.length + 1,
                                                "member": receiverCompany,
                                                "is_blocked": false,
                                                "is_deleted": false,
                                                "provision": 0,
                                                "privileges": []
                                            })
                                        } else {
                                            teamArray.push({ // push data of new member into array
                                                "id": 1,
                                                "member": receiverCompany,
                                                "is_blocked": false,
                                                "is_deleted": false,
                                                "provision": 0,
                                                "privileges": []
                                            })
                                        }
                                        let obj = {
                                            members: teamArray
                                        }
                                        Team.update(obj, { // add the new member into the sender team
                                            where: {
                                                companyId: company.id,
                                            }
                                        }).then(newMember => {
                                            res.status(200).json({ // return message success
                                                message: "invitation was  accepted",
                                                success: "accepted"
                                            })
                                        }).catch(err => {
                                            res.status(500).json({
                                                message: err.message,
                                                success: false
                                            })
                                        })
                                    }
                                }).catch(err => {
                                    res.status(500).json({
                                        message: err.message,
                                        success: false
                                    })
                                })

                            }).catch(err => {
                                res.status(500).json({
                                    message: err.message,
                                    success: false
                                })
                            })
                        }
                    })
                }
            } else {
                invitation.is_refused = 1;
                invitation.save();
                res.status(200).json({
                    message: "invitation was declined",
                    success: "declined"
                })
            }
        } else {
            res.status(200).json({
                message: "invitation not found",
                success: "not found"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
}

/* SENT INVITATION TO USER ALREADY EXIST */
exports.sendInvitationToNewUser = (req, res) => {
    Invitations.findOne({
        where: {
            senderId: req.body.sender_id,
            email: req.body.email,
            is_accepted: 1,
            is_deleted: 0
        },
        include: [{
            model: db.user,
            as: "userSender"
        }]
    }).then(invitation => {
        if (invitation) {
            res.status(200).json({
                message: "invitation was already accepted",
                success: "accepted"
            })
        } else {
            Invitations.create({
                invitation_token: crypto.randomBytes(20).toString('hex'), // genrate invitation key
                senderId: req.body.sender_id,
                is_accepted: 0,
                is_refused: 0,
                is_deleted: 0,
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                role: req.body.role
            }).then(newInvitation => {
                Users.findOne({
                    where: {
                        id: req.body.sender_id
                    }
                }).then(user => {
                    mailto.readHTMLFile('./templates/new_user_invitation.html', function (err, html) {
                        var template = handlebars.compile(html);
                        var replacements = {
                            fullname: req.body.first_name + " " + req.body.last_name,
                            code: newInvitation.invitation_token,
                            role: req.body.role
                        };
                        var htmlToSend = template(replacements);
                        var mailOptions = {
                            to: req.body.email,
                            subject: 'New invitation from ' + user.first_name + ' ' + user.last_name,
                            html: htmlToSend
                        };
                        mailto.smtpTransport.sendMail(mailOptions, function (error, response) {
                            if (error) {
                                ;
                                callback(error);
                            }
                        });
                    });
                    res.status(200).json({
                        message: 'Invitation was sent successfully',
                        success: true
                    })
                }).catch(err => {
                    res.status(500).json({
                        message: err.message,
                        success: false
                    })
                })
            })

        }
    })
}