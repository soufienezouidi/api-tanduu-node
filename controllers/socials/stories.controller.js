const db = require('../../models');
const fs = require('fs');
const path = require('path');
const Stories = db.stories;
const Like = db.likes;
const uuidv4 = require("../../middleware/encryption");
const { Op } = require('sequelize');
const moment = require('moment')

exports.allStories = (req, res) => {
    Stories.findAll({
            where: {
                is_deleted: 0,
                is_archived: 0,
                /*   createdAt: {
                       [Op.lte]: new Date(Date.now() - (60 * 60 * 1000)),
                   }*/
            },
            limit: 5,
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
                }
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
            Like.create({
                likesUsers: [],
                likesCompanies: [],
                storyId: story.id
            }).then(() => {});
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
exports.getStoryFile = (req, res) => {
    const userId = req.params.userId;
    const fileName = req.params.fileName;
    let file = fs.readFileSync(
        "./public/users/user" + userId + "/stories/" + fileName
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
                    message: "story not found",
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