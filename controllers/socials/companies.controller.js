const db = require('../../models');
const fs = require('fs');
const path = require('path');
const Page = db.companies;
const Contact = db.contacts;
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
                page.avatar = (Math.random() + 1).toString(36).substring(2) + "" + page.id + ".png";
                page.cover = (Math.random() + 1).toString(36).substring(2) + "" + page.id + ".png";
                page.company_link = req.body.company_link + "." + page.id + "" + page.userId
                page.save();

                Contact.create({
                    followers: [],
                    following: [],
                    friends: [],
                    members: [],
                    companyId: page.id,
                }).then(() => {


                    fs.mkdir(
                        path.join("./public/users/user" + page.userId + "/companies", "company_" + page.id),
                        (err) => {
                            if (err) {
                                return console.error(err);
                            }
                            fs.mkdir(
                                path.join("./public/users/user" + page.userId + "/companies/company_" + page.id, "bounces"),
                                (err) => {
                                    if (err) {
                                        return console.error(err);
                                    }
                                    fs.mkdir(
                                        path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id + "/bounces", "comments"),
                                        (err) => {
                                            if (err) {
                                                return console.error(err);
                                            }
                                            fs.mkdir(
                                                path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id + "/bounces", "replies"),
                                                (err) => {
                                                    if (err) {
                                                        return console.error(err);
                                                    }
                                                    fs.mkdir(
                                                        path.join("./public/users/user" + page.userId + "/companies/company_" + page.id, "/profile pictures"),
                                                        (err) => {
                                                            if (err) {
                                                                return console.error(err);
                                                            }
                                                            fs.mkdir(
                                                                path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id + "/profile pictures", "comments"),
                                                                (err) => {
                                                                    if (err) {
                                                                        return console.error(err);
                                                                    }
                                                                    fs.mkdir(
                                                                        path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id + "/profile pictures", "replies"),
                                                                        (err) => {
                                                                            if (err) {
                                                                                return console.error(err);
                                                                            }
                                                                            fs.mkdir(
                                                                                path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id, "cover pictures"),
                                                                                (err) => {
                                                                                    if (err) {
                                                                                        return console.error(err);
                                                                                    }
                                                                                    fs.mkdir(
                                                                                        path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id + "/cover pictures", "comments"),
                                                                                        (err) => {
                                                                                            if (err) {
                                                                                                return console.error(err);
                                                                                            }
                                                                                            fs.mkdir(
                                                                                                path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id + "/cover pictures", "replies"),
                                                                                                (err) => {
                                                                                                    if (err) {
                                                                                                        return console.error(err);
                                                                                                    }
                                                                                                    fs.mkdir(
                                                                                                        path.join("./public/users/user" + page.userId + "/companies" + "/company_" + page.id, "timeline photos"),
                                                                                                        (err) => {
                                                                                                            if (err) {
                                                                                                                return console.error(err);
                                                                                                            }
                                                                                                            fs.mkdir(
                                                                                                                path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id + "/timeline photos", "comments"),
                                                                                                                (err) => {
                                                                                                                    if (err) {
                                                                                                                        return console.error(err);
                                                                                                                    }
                                                                                                                    fs.mkdir(
                                                                                                                        path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id, "stories"),
                                                                                                                        (err) => {
                                                                                                                            if (err) {
                                                                                                                                return console.error(err);
                                                                                                                            }
                                                                                                                            fs.mkdir(
                                                                                                                                path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id + "/timeline photos", "replies"),
                                                                                                                                (err) => {
                                                                                                                                    if (err) {
                                                                                                                                        return console.error(err);
                                                                                                                                    }
                                                                                                                                    fs.mkdir(
                                                                                                                                        path.join("./public/users/user" + page.userId + "/companies" + "/company_" + page.id, "mobile uploads"),
                                                                                                                                        (err) => {
                                                                                                                                            if (err) {
                                                                                                                                                return console.error(err);
                                                                                                                                            }
                                                                                                                                            fs.mkdir(
                                                                                                                                                path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id + "/mobile uploads", "comments"),
                                                                                                                                                (err) => {
                                                                                                                                                    if (err) {
                                                                                                                                                        return console.error(err);
                                                                                                                                                    }
                                                                                                                                                    fs.mkdir(
                                                                                                                                                        path.join("./public/users/user" + page.userId + "/companies/" + "company_" + page.id + "/mobile uploads", "replies"),
                                                                                                                                                        (err) => {
                                                                                                                                                            if (err) {
                                                                                                                                                                return console.error(err);
                                                                                                                                                            }
                                                                                                                                                            const filePath =
                                                                                                                                                                "./public/images/profilepic.png";
                                                                                                                                                            const filePathcover =
                                                                                                                                                                "./public/images/company_cover.png";
                                                                                                                                                            const filePathCopy =
                                                                                                                                                                "./public/users/user" +
                                                                                                                                                                page.userId + "/companies/" + "company_" + page.id +
                                                                                                                                                                "/profile pictures/" + page.avatar;
                                                                                                                                                            const filePathCopycover =
                                                                                                                                                                "./public/users/user" +
                                                                                                                                                                page.userId + "/companies/" + "company_" + page.id +
                                                                                                                                                                "/cover pictures/" + page.cover;
                                                                                                                                                            fs.copyFile(filePath, filePathCopy, (err) => {
                                                                                                                                                                if (err) throw err;
                                                                                                                                                                console.log("File Copy Successfully.");
                                                                                                                                                                fs.copyFile(filePathcover, filePathCopycover, (err) => {
                                                                                                                                                                    if (err) throw err;
                                                                                                                                                                    console.log("File Copy Successfully.");
                                                                                                                                                                });
                                                                                                                                                            });

                                                                                                                                                        }

                                                                                                                                                    )

                                                                                                                                                }

                                                                                                                                            )

                                                                                                                                        }

                                                                                                                                    )

                                                                                                                                }
                                                                                                                            )
                                                                                                                        }
                                                                                                                    )

                                                                                                                }

                                                                                                            )

                                                                                                        }

                                                                                                    )
                                                                                                }

                                                                                            )

                                                                                        }

                                                                                    )

                                                                                }

                                                                            )

                                                                        }
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    )
                                                }
                                            );

                                        }
                                    );

                                }
                            );
                        }
                    );
                });

                res.status(200).json({
                    page: page.company_link,
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
                company_link: req.body.id,

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

/* get page by user */
exports.getPageByUser = (req, res) => {
    Page.findAll({
            where: {
                userId: req.body.id,

            }
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

exports.getAllCompanies = (req, res) => {
    Page.findAll().then(pages => {
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
    const fileName = req.params.name;
    const user = req.params.user;
    const page = req.params.page;
    let profilepic = fs.readFileSync(
        "./public/users/user" + user + "/companies/company_" + page + "/profile pictures/" + fileName
    );
    res.status(200).send(profilepic);
};

exports.getPageCover = (req, res) => {
    const fileName = req.params.name;
    const user = req.params.user;
    const page = req.params.page;
    let profilepic = fs.readFileSync(
        "./public/users/user" + user + "/companies/company_" + page + "/cover pictures/" + fileName
    );
    res.status(200).send(profilepic);
};

exports.getAllAlbumsOfUser = (req, res) => {
    Albums.findAll({
            where: {
                is_deleted: false,
                companyId: req.body.id
            },
            include: [{
                model: db.companies
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