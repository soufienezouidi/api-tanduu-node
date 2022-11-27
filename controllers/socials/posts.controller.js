const db = require('../../models');
const fs = require('fs');
const path = require('path');
const Post = db.posts;
const Comment = db.comments_posts;
const Like = db.likes;
const CommentReplies = db.comments_replies;
const uuidv4 = require("../../middleware/encryption")
const { Op } = require("sequelize");


/* profile settings of user */
exports.allPosts = (req, res) => {
    Post.findAll({
            where: {
                is_accepted: 1
            },
            limit: 4,
            order: [
                ['id', 'DESC'],
            ],
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
                {
                    model: db.bounces,

                },
                {
                    model: db.user_blogs,

                },

                {
                    model: db.posts,
                    as: 'post',
                    include: [{
                            model: db.user,
                            as: "user",
                        },
                        {
                            model: db.user_blogs,

                        },

                        {
                            model: db.albums
                        },
                        {
                            model: db.bounces
                        }
                    ]
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

        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.loadMore = (req, res) => {
    Post.findAll({
            where: {
                is_accepted: 1,
                id: {
                    [Op.lt]: req.body.lastId
                }

            },
            limit: 4,
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                    model: db.user,
                    as: "user",
                },
                {
                    model: db.user_blogs,

                },
                {
                    model: db.likes
                },
                {
                    model: db.albums
                },
                {
                    model: db.bounces,

                },

                {
                    model: db.posts,
                    as: 'post',
                    include: [{
                            model: db.user,
                            as: "user",
                        },
                        {
                            model: db.user_blogs,

                        },
                        {
                            model: db.albums
                        },
                        {
                            model: db.bounces
                        }
                    ]
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

        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.allPostsByHashed = (req, res) => {
    Post.findAll({
            where: {
                hashed: req.body.hashed
            },
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
                {
                    model: db.posts,
                    as: 'post',
                    include: [{
                        model: db.user,
                        as: "user",
                    }]
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
                },
            ]

        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};
/* profile settings of user */
exports.postsUser = (req, res) => {
    Post.findAll({
            where: {
                posterUserId: req.body.id,
                is_accepted: 1
            },
            limit: 4,
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                    model: db.user,
                    as: "user",
                },
                {
                    model: db.likes
                },
                {
                    model: db.user_blogs,

                },

                {
                    model: db.albums
                },
                {
                    model: db.bounces,

                },
                {
                    model: db.user_blogs,

                },

                {
                    model: db.posts,
                    as: 'post',
                    include: [{
                            model: db.user,
                            as: "user",
                        },
                        {
                            model: db.user_blogs,

                        },

                        {
                            model: db.albums
                        },
                        {
                            model: db.bounces
                        }
                    ]
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
        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get settings of company */
exports.postsCompany = (req, res) => {
    Post.findAll({
            where: {
                posterCompanyId: req.body.id
            },
            include: [{
                model: db.companies,
                as: "company"
            }]
        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get settings of company */
exports.postById = (req, res) => {
    Post.findOne({
            where: {
                id: req.body.id
            },
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
                /* {
                     model: db.media_posts,
                     where: { is_deleted: 0 }

                 },
                 {
                     model: db.saved_items,
                     where: { is_deleted: 0 }

                 },*/
                {
                    model: db.posts,
                    as: 'post',
                    include: [{
                            model: db.user,
                            as: "user",
                        },
                        {
                            model: db.albums
                        }
                    ]
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
        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* update settings */
exports.updatePost = (req, res) => {
    Post.update(req.body, {
            where: {
                id: req.body.id,
            },
        }).then(post => {
            if (!post) {
                res.status(200).json({
                    message: "post not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    post: 4,
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

/* create post  */
exports.createPost = (req, res) => {
    Post.create(req.body).then(post => {
            if (!post) {

                res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            } else {
                post.hashed = uuidv4.uuiid(post.id, 100);
                post.save();
                Like.create({
                    likesUsers: [],
                    likesCompanies: [],
                    postId: post.id,
                    bounceId: req.body.bounceId ? req.body.bounceId : null
                }).then(() => {});

                res.status(200).json({
                    post: post,
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

/* create comments  */
exports.createCommentsPost = (req, res) => {
    Comment.create(req.body).then(comment => {
            if (!comment) {
                res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    comment: comment,
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

/* update comment */
exports.updatecomment = (req, res) => {
    Comment.update(req.body, {
            where: {
                id: req.body.id,
            },
        }).then(comment => {
            if (!comment) {
                res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    comment: comment,
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

/* get comments of posts */
exports.commentsPosts = (req, res) => {
    Comment.findAll({
            where: {
                postId: req.body.id,

                is_accepted: 1
            },
            include: [{
                    model: db.user,
                    as: "user"
                },
                {
                    model: db.companies,
                    as: "company"
                },
                {
                    model: db.comments_replies,
                    //  where: { is_accepted: 1, is_deleted: 0 },
                },
                {
                    model: db.likes
                },
                {
                    model: db.posts,
                    include: [{
                        model: db.albums
                    }]
                }
            ]
        })
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get comments of media */
exports.commentsMedia = (req, res) => {
    Comment.findAll({
            where: {
                mediaPostId: req.body.id,
                is_accepted: 1
            },
            include: [{
                    model: db.user,
                    as: "user"
                },
                {
                    model: db.companies,
                    as: "company"
                },
                {
                    model: db.comments_replies
                        //  where: { is_accepted: 1 }
                },
                {
                    model: db.likes
                },
                {
                    model: db.posts,
                    include: [{
                        model: db.albums
                    }]
                }
            ]
        })
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get comments of bounce */
exports.commentsBounces = (req, res) => {
    Comment.findAll({
            where: {
                bounceId: req.body.id,
                is_accepted: 1
            },
            include: [{
                    model: db.user,
                    as: "user"
                },
                {
                    model: db.companies,
                    as: "company"
                },
                {
                    model: db.comments_replies
                        //  where: { is_accepted: 1 }
                },
                {
                    model: db.likes
                }
            ]
        })
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get comments of posts */
exports.commentById = (req, res) => {
    Comment.findOne({
            where: {
                id: req.body.id
            },
            include: [{
                    model: db.user,
                    as: "user"
                },
                {
                    model: db.companies,
                    as: "company"
                },
                {
                    model: db.posts,
                    include: [{
                        model: db.albums
                    }]
                }
            ]
        })
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* create comments replies  */
exports.createCommentsReplies = (req, res) => {
    CommentReplies.create(req.body).then(comment => {
            if (!comment) {
                res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    comment: comment,
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

/* update comment */
exports.updatecommentReplies = (req, res) => {
    CommentReplies.update(req.body, {
            where: {
                id: req.body.id,
            },
        }).then(comment => {
            if (!comment) {
                res.status(200).json({
                    message: "comment not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    comment: comment,
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

/* get comments replies  of comment */
exports.commentsRepliesComment = (req, res) => {
    CommentReplies.findAll({
            where: {
                commentPostId: req.body.id,
                is_accepted: 1
            },
            include: [{
                    model: db.user,
                    as: "user"
                },
                {
                    model: db.companies,
                    as: "company"
                },
                {
                    model: db.likes
                }
            ]
        })
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get comments replies of comments */
exports.commentRepliesById = (req, res) => {
    CommentReplies.findOne({
            where: {
                id: req.body.id
            },
            include: [{
                    model: db.user,
                    as: "user"
                },
                {
                    model: db.companies,
                    as: "company"
                }
            ]
        })
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

exports.getPostFile = (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const fileName = req.params.fileName;
    let file = fs.readFileSync(
        "./public/users/user" + userId + "/" + postId + "/" + fileName
    );
    res.status(200).send(file);
};