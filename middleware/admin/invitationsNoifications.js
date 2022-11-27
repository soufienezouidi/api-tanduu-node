const db = require('../../models');
const Notifications = db.notifications;
const Users = db.user;

sendInvitationToOldReceiver = (req, res, next) => {
    Users.findOne({
        where: {
            id: req.body.sender_id
        }
    }).then(user => {
        Notifications.create({
            title: "New invitation",
            content: "You receive new invitation from " + user.first_name + " " + user.last_name,
            senderId: user.id,
            type: "Invitation"
        }).then(notification => {
            next();
        })
    })

}

const invitationNotification = {
    sendInvitationToOldReceiver: sendInvitationToOldReceiver,
};

module.exports = invitationNotification;