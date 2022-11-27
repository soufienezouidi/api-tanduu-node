const db = require("../../models");
const Blog_comments = db.blog_comments;


exports.addcomment = (req, res) => {

    Blog_comments.create({
            id_blog: req.body.blog_id,
            comment: req.body.comment,

        })
        .then(comments => {
            res.status(200).json({
                success: true,
                comment: comments
            });

        }).catch(err => {
            res.status(500).json({
                success: false,
                message: err.message
            })

        });
};

exports.getBlogcommentsById = (req, res) => {
    Blog_comments.findAll({
        where: {
            id_blog: req.body.blog_id
        }
    }).then(comments => {
        if (!comments) {
            res.status(200).json({
                message: "Blog not found"
            });
        } else {
            res.status(200).json(comments)
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}