const db = require("../../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const Notifications = db.notifications;

/* CREATE NEW NOTIFICATION */
exports.createNotification = (req, res) => {
  Notifications.create(req.body)
    .then((notification) => {
      res.status(200).json({
        notification: notification,
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: false,
      });
    });
};

/* UPDATE NOTIFICATION */
exports.updateNotification = (req, res) => {
  Notifications.update(req.body, {
    where: {
      id: req.body.id,
    },
  })
    .then((notification) => {
      if (notification) {
        res.status(200).json({
          message: "notification was updated successfully.",
          success: true,
        });
      } else {
        res.status(200).json({
          message: "notification not found",
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: true,
      });
    });
};

/* GET NOTIFICATION BY STATE */
exports.getNotificationByState = (req, res) => {
  Notifications.findOne({
    where: {
      state: req.body.state,
    },
  })
    .then((notification) => {
      if (notification) {
        res.status(200).json({
          notification: notification,
          success: true,
        });
      } else {
        res.status(200).json({
          message: "notification not found",
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: true,
      });
    });
};

/* GET NOTIFICATION BY RECEIVER ID */
exports.getNotificationByReceiver = (req, res) => {
  Notifications.findOne({
    where: {
      receiverId: req.body.receiverId,
    },
  })
    .then((notification) => {
      if (notification) {
        res.status(200).json({
          notification: notification,
          success: true,
        });
      } else {
        res.status(200).json({
          message: "notification not found",
          success: false,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
        success: true,
      });
    });
};
