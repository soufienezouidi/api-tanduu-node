const db = require("../../models");
const Invitations = db.invitations;
const Users = db.user;
const crypto = require('crypto');
const mailto = require("../../config/mailServer.config");
var handlebars = require('handlebars');
const Contact = db.contacts;


/* sent invtation to new friend */
exports.sendInvitation = (req, res) => {
    Users.findOne({
        where: {
            id: req.body.receiver_id,
        }
    }).then(receiver => {
        if (receiver) {
            Invitations.findOne({
                where: {
                    senderId: req.body.sender_id,
                    receiverId: receiver.id,
                    is_deleted: 0
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
                            /*mailto.readHTMLFile('./templates/sent_invitation.html', function(err, html) {
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
                                mailto.smtpTransport.sendMail(mailOptions, function(error, response) {
                                    if (error) {;
                                        callback(error);
                                    }
                                });
                            });*/
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

/* accept and decline invtation */
exports.acceptOrDeclineInvitation = (req, res) => {
    Invitations.findOne({
        where: {
            id: req.body.id,
            //invitation_token: req.body.invitation_key,
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
            if (req.body.status == "accept") {
                invitation.is_accepted = 1;
                invitation.is_deleted = 1;
                invitation.save();

            } else {
                invitation.is_refused = 1;
                invitation.is_deleted = 1;
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

/* update contact table */
exports.contactUpdate = (req, res) => {
    Contact.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(contact => {
        res.status(200).json({
            contact: contact,
            success: true
        })
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
}


exports.updateInvitation = (req, res) => {
        Invitations.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(invitation => {
            res.status(200).json({
                invitations: invitation,
                success: true
            })
        }).catch(err => {
            res.status(500).json({
                message: err.message,
                success: false
            })
        })
    }
    /* show All invitaions sent */
exports.showAllInvitationsSent = (req, res) => {
    Invitations.findAll({
        where: {
            senderId: req.body.id,
            is_accepted: 0,
            is_refused: 0,
            is_deleted: 0
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

/* show all invitations received */
exports.showAllInvitationsReceived = (req, res) => {
    Invitations.findAll({
        where: {
            receiverId: req.body.id,
            is_accepted: 0,
            is_refused: 0,
            is_deleted: 0
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

/* get single invitation by secret key */
exports.getSingleInvitationByKey = (req, res) => {
        Invitations.findOne({
            where: {
                invitation_token: req.body.key,
                is_deleted: 0
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
    /* get single invitation by secret key */
exports.getRelationsUsers = (req, res) => {
    Invitations.findOne({
        where: {
            senderId: req.body.sender_id,
            receiverId: req.body.receiver_id,
            is_deleted: 0
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