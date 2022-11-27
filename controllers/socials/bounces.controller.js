const db = require('../../models');
const fs = require('fs');
const path = require('path');
const Stories = db.bounces;
const Comment = db.comments_posts;
const Like = db.likes;
const uuidv4 = require("../../middleware/encryption");
const { Op } = require('sequelize');
const moment = require('moment')

exports.allStories = (req, res) => {
    Stories.findAll({
            where: {
                is_deleted: 0,
            },
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                    model: db.user,
                },
                {
                    model: db.companies
                },
                {
                    model: db.likes
                },
            ]

        })
        .then(stories => {
            res.status(200).json(stories);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.allStoriesOfUser = (req, res) => {
    Stories.findAll({
            where: {
                is_deleted: 0,
                userId: req.body.id
            },
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                    model: db.user,
                },
                {
                    model: db.companies
                },
                {
                    model: db.likes
                },
            ]

        })
        .then(stories => {
            res.status(200).json(stories);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.createStories = (req, res) => {
    Stories.create(req.body)
        .then(story => {
            story.link = uuidv4.uuiid(story.id, 100);
            story.save();
            res.status(200).json(story);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.getStoryLink = (req, res) => {
    Stories.findOne({
            where: {
                link: req.body.link
            },
            include: [{
                    model: db.user,
                },
                {
                    model: db.companies
                },
                {
                    model: db.likes
                },
                {
                    model: db.posts
                }
            ]

        })
        .then(story => {
            res.status(200).json(story);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};


exports.getLastBounce = (req, res) => {
    Stories.findOne({
            where: {
                id: {
                    [Op.gt]: req.body.bounceId
                },
                is_deleted: 0
            },
            include: [{
                    model: db.user,
                },
                {
                    model: db.companies
                },
                {
                    model: db.likes
                }
            ],
            order: [
                ['id', 'ASC'],
            ],

        })
        .then(story => {
            res.status(200).json(story);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.getPreviousBounce = (req, res) => {
    Stories.findOne({
            where: {
                id: {
                    [Op.lt]: req.body.bounceId
                },
                is_deleted: 0
            },
            include: [{
                    model: db.user,
                },
                {
                    model: db.companies
                },
                {
                    model: db.likes
                }
            ],
            order: [
                ['id', 'DESC'],
            ],

        })
        .then(story => {
            res.status(200).json(story);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};
exports.getStoryFile = (req, res) => {
    const userId = req.params.userId;
    const fileName = req.params.fileName;
    let file = fs.readFileSync(
        "./public/users/user" + userId + "/bounces/" + fileName
    );
    res.status(200).send(file);
};

exports.updateStory = (req, res) => {
    Stories.update(req.body, {
            where: {
                id: req.body.id,
            },
        }).then(story => {
            if (!story) {
                res.status(200).json({
                    message: "bounce not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    story: story,
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
exports.getStoryBackground = (req, res) => {
    const fileName = req.params.fileName;
    let file = fs.readFileSync(
        "./public/images/stories/" + fileName
    );
    res.status(200).send(file);
};


exports.deleteFile = (req, res) => {
    const fileName = req.body.filename;;
    let deleteFile = "./public/users/users" + req.body.userId + "/bounces/" + fileName
        /*  fs.stat(file, function(err, stats) {
              console.log(stats); //here we got all information of file in stats variable

              if (err) {
                  return console.error(err);
              }

              fs.unlink(file, function(err) {
                  if (err) return console.log(err);
                  console.log('file deleted successfully');
              });
          });*/
        // if (fs.existsSync(deleteFile)) {
    fs.rmSync(deleteFile, { recursive: true, force: true });
    // }
    res.status(200).json({
        success: true,
        message: "file was removed"
    });
};