const db = require("../../models")
const Media = db.media_posts;
const fs = require("fs");
const path = require("path");
const Album = db.albums
const Likes = db.likes;
const Comment = db.comments_posts
const uuidv4 = require("../../middleware/encryption")

/* create hashtags of posts */
exports.createMedia = (req, res) => {
    let media = req.body.media;
    if (media.length > 0) {
        for (let i = 0; i < media.length; i++) {
            Media.create(media[i]).then(media => {
                    if (!media) {
                        res.status(200).json({
                            message: "something wrong happened",
                            success: false,
                        });
                    } else {
                        media.link_hashed = uuidv4.uuiid(media.id, 100);
                        media.save();
                        Likes.create({
                            likesUsers: [],
                            likesCompanies: [],
                            mediaPostId: media.id,
                        }).then(likes => {

                        }).catch((err) => {
                            res.status(500).json({
                                message: err.message,
                                success: false,
                            });
                        });

                        res.status(200).json({
                            data: media,
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
    }

}

/* create hashtags of posts */
exports.editMedia = (req, res) => {
    Media.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(media => {
            if (!media) {
                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: media,
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

/* create hashtags of posts */
exports.editMediaOfPosts = (req, res) => {
    let mediaArray = req.body.mediaArray;
    if (mediaArray.length > 0) {
        for (var i = 0; i < mediaArray.length; i++) {
            //if (mediaArray[i].is_new === false) {
            console.log("aaaaaaaaa=====> " + mediaArray[i].id)
            Media.update(mediaArray[i], {
                    where: {
                        id: mediaArray[i].id
                    }
                }).then(media => {
                    if (!media) {
                        res.status(200).json({
                            message: "something wrong happened",
                            success: false,
                        });
                    } else {
                        res.status(200).json({
                            data: media,
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
    }
    Media.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(media => {
            if (!media) {
                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: media,
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

/* get All Media by user */
exports.getAllMediaOfUser = (req, res) => {
    Media.findAll({
            where: {
                is_deleted: false,
                userId: req.body.id
            },
            include: [{
                    model: db.user
                },
                {
                    model: db.companies
                },
                {
                    model: db.albums
                },
                {
                    model: db.posts
                }
            ]
        }).then(media => {

            res.status(200).json({
                data: media,
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

/* get All Media by user */
exports.getAllMediaOfCompany = (req, res) => {
    Media.findAll({
            where: {
                is_deleted: false,
                companyId: req.body.id
            },
            include: [{
                    model: db.user
                },
                {
                    model: db.companies
                },
                {
                    model: db.albums
                },
                {
                    model: db.posts
                }
            ]
        }).then(media => {

            res.status(200).json({
                data: media,
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

/* get media by id */
exports.getMediaById = (req, res) => {
    Media.findOne({
            where: {
                id: req.body.id
            },
            include: [{
                    model: db.user
                },
                {
                    model: db.companies
                },
                {
                    model: db.albums
                },
                {
                    model: db.posts
                }
            ]
        }).then(media => {

            res.status(200).json({
                data: media,
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


/* get Media by hashed link */

exports.getMediaByHasheLink = (req, res) => {
    Media.findOne({
            where: {
                link_hashed: req.body.link_hashed
            },
            include: [{
                    model: db.user
                },
                {
                    model: db.companies
                },
                {
                    model: db.albums
                },
                {
                    model: db.posts,
                    include: [{
                            model: db.user,
                            as: "user",
                        },
                        {
                            model: db.likes
                        },
                        {
                            model: db.albums
                        },
                    ]
                },
                {
                    model: db.likes
                },
                {
                    model: db.comments_posts,
                    where: { is_accepted: 1 },
                    limit: 1,

                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [{
                            model: db.user,
                            as: "user",
                        },
                        {
                            model: db.likes
                        }
                    ]
                }
            ]
        }).then(media => {

            res.status(200).json({
                data: media,
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

exports.getMediaByName = (req, res) => {
        Media.findOne({
                where: {
                    filename: req.body.filename
                },
                include: [{
                        model: db.user
                    },
                    {
                        model: db.companies
                    },
                    {
                        model: db.likes
                    },
                    {
                        model: db.albums
                    },
                    {
                        model: db.posts,
                        include: [{
                                model: db.user,
                                as: "user",
                            },
                            {
                                model: db.likes
                            },
                            {
                                model: db.albums
                            },
                        ]
                    },
                    {
                        model: db.likes
                    },
                    {
                        model: db.comments_posts,
                        limit: 1,

                        order: [
                            ['createdAt', 'DESC']
                        ],
                        include: [{
                                model: db.user,
                                as: "user",
                            },
                            {
                                model: db.likes
                            }
                        ]
                    }
                ]
            }).then(media => {

                res.status(200).json({
                    data: media,
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
    /* get media by albums */
exports.getMediaByAlbums = (req, res) => {
    Media.findAll({
            where: {
                albumId: req.body.albumId
            },
            include: [{
                    model: db.user
                },
                {
                    model: db.companies
                },
                {
                    model: db.albums
                },
                {
                    model: db.posts
                }
            ]
        }).then(media => {

            res.status(200).json({
                data: media,
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

exports.getMediaVideo = (req, res) => {
    Media.findAll({
            where: {
                file_type: "video",
                is_deleted: 0,
                userId: req.body.id,
            },
            include: [{
                    model: db.user
                },
                {
                    model: db.companies
                },
                {
                    model: db.albums
                },
                {
                    model: db.posts
                }
            ]
        }).then(media => {

            res.status(200).json({
                data: media,
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
exports.getMediaAllVideo = (req, res) => {
    Media.findAll({
            where: {
                file_type: "video",
                is_deleted: 0,

            },
            include: [{
                    model: db.user
                },
                {
                    model: db.companies
                },
                {
                    model: db.albums
                },
                {
                    model: db.posts
                }
            ]
        }).then(media => {

            res.status(200).json({
                data: media,
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

exports.getMediaImages = (req, res) => {
    Media.findAll({
            where: {
                file_type: "image",
                is_deleted: 0,
                userId: req.body.id,
            },
            include: [{
                    model: db.user
                },
                {
                    model: db.companies
                },
                {
                    model: db.albums
                },
                {
                    model: db.posts
                }
            ]
        }).then(media => {

            res.status(200).json({
                data: media,
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


exports.getMediaImages = (req, res) => {
        Media.findAll({
                where: {
                    file_type: "image",
                    is_deleted: 0,
                    userId: req.body.id,
                },
                include: [{
                        model: db.user
                    },
                    {
                        model: db.companies
                    },
                    {
                        model: db.albums
                    },
                    {
                        model: db.posts
                    }
                ]
            }).then(media => {

                res.status(200).json({
                    data: media,
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
    /** get all media by post */
exports.getAllMediaOfPost = (req, res) => {
        Media.findAll({
                where: {
                    postId: req.body.postId,
                    is_deleted: 0,
                },
                include: [{
                        model: db.user
                    },
                    {
                        model: db.companies
                    },
                    {
                        model: db.albums
                    },
                    {
                        model: db.posts
                    }
                ]
            }).then(media => {

                res.status(200).json({
                    data: media,
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
    /* get All albums of user */
exports.getAllAlbumsOfUser = (req, res) => {
    Album.findAll({
            where: {
                is_deleted: false,
                userId: req.body.id
            },
            include: [{
                    model: db.user
                },
                {
                    model: db.companies
                }
            ]
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

/* get All albums of company */
exports.getAllAlbumsOfCompany = (req, res) => {
    Album.findAll({
            where: {
                is_deleted: false,
                companyId: req.body.id
            },
            include: [{
                    model: db.user
                },
                {
                    model: db.companies
                }
            ]
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

/* create album  */
exports.createNewAlbum = (req, res) => {
    Album.create(req.body).then((album) => {
        if (!album) {
            res.status(200).json({
                message: "something wrong happened",
                success: false,
            });
        } else {
            fs.mkdir(
                path.join("./public/users/user" + req.body.userId, req.body.name),
                (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    fs.mkdir(
                        path.join("./public/users/user" + req.body.userId + "/" + req.body.name, "comments"),
                        (err) => {
                            if (err) {
                                return console.error(err);
                            }
                            fs.mkdir(
                                path.join("./public/users/user" + req.body.userId + "/" + req.body.name, "replies"),
                                (err) => {
                                    if (err) {
                                        return console.error(err);
                                    }
                                })
                        })
                })
            res.status(200).json({
                message: album,
                success: true,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    });
}
exports.updateAlbum = (req, res) => {
    Album.create(req.body, {
        where: {
            id: req.body.id,
        }
    }).then((album) => {
        if (!album) {
            res.status(200).json({
                message: "something wrong happened",
                success: false,
            });
        } else {
            res.status(200).json({
                message: "album was created",
                success: true,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    });
}