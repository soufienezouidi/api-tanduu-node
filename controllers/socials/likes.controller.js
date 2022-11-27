const db = require('../../models');
const Like = db.likes;
/* create likes   */
exports.createlikes = (req, res) => {
    Like.create(req.body).then(like => {
            if (!like) {
                res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    like: like,
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

/* update like */
exports.updateLike = (req, res) => {
    Like.update(req.body, {
            where: {
                id: req.body.id,
            },
        }).then(like => {
            if (!like) {
                res.status(200).json({
                    message: "like not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    like: like,
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

/* get likes of post */
exports.AllLikesPosts = (req, res) => {
    Like.findAll({
            where: {
                postId: req.body.id,
                type: "posts"
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
                    as: "post"
                }
            ]
        })
        .then(likes => {
            res.status(200).json(likes);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get likes of comment */
exports.AllLikesComments = (req, res) => {
    Like.findAll({
            where: {
                commentId: req.body.id,
                type: "comments"
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
                    model: db.comments,
                    as: "comment"
                }
            ]
        })
        .then(likes => {
            res.status(200).json(likes);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get likes of comment replies */
exports.AllLikesCommentsReplies = (req, res) => {
    Like.findAll({
            where: {
                commentReplyId: req.body.id,
                type: "replies_comments"
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
                    model: db.comments,
                    as: "reply"
                }
            ]
        })
        .then(likes => {
            res.status(200).json(likes);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};
/* get likes By body request */
exports.likeById = (req, res) => {
    Like.findOne(req.body)
        .then(likes => {
            res.status(200).json(likes);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};