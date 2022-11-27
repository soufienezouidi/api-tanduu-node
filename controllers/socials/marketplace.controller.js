const db = require('../../models');
const fs = require('fs');
const path = require('path');
const Page = db.products_company;
const Contact = db.contacts;
const Albums = db.albums
const CommentReplies = db.comments_replies;
const uuidv4 = require("../../middleware/encryption")
const { Op } = require("sequelize");
let standardAlbums = ["timeline photos", "profile pictures", "cover pictures", "mobile uploads"]


/* create page */
exports.createPage = (req, res) => {
    Page.create(req.body).then(page => {
            if (!page) {
                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {

                page.page_link = req.body.link + "." + page.id + "" + page.userId
                page.save();
                res.status(200).json({
                    page: page,
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

/* update page */
exports.updatePage = (req, res) => {
    Page.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(page => {
            if (!page) {
                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {

                res.status(200).json({
                    page: page,
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

/* get page by link */
exports.getPageByLink = (req, res) => {
    Page.findOne({
            where: {
                page_link: req.body.id

            },
            include: [{
                model: db.contacts
            }]
        }).then(page => {
            if (!page) {
                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {

                res.status(200).json({
                    page: page,
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

/* get page by user */
exports.getPageByUser = (req, res) => {
    Page.findAll({
            where: {
                userId: req.body.id,
            },
            include: [{
                model: db.user,
                as: "user"
            }]
        }).then(pages => {
            res.status(200).json({
                page: pages,
                success: true,
            });

        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            });
        });
}

exports.getPageProfile = (req, res) => {
    const fileName = req.params.fileName;
    let profilepic = fs.readFileSync(
        "./public/images/products/" + fileName
    );
    res.status(200).send(profilepic);
};

exports.getPageCover = (req, res) => {
    const fileName = req.params.name;
    const user = req.params.user;
    const page = req.params.page;
    let profilepic = fs.readFileSync(
        "./public/users/user" + user + "/pages/page_" + page + "/cover pictures/" + fileName
    );
    res.status(200).send(profilepic);
};

exports.getAllAlbumsOfUser = (req, res) => {
    Albums.findAll({
            where: {
                is_deleted: false,
                pagesUserId: req.body.id
            },
            include: [{
                model: db.pages_users
            }]
        }).then(albums => {

            res.status(200).json({
                data: albums,
                success: true,
            });


        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            });
        });
}