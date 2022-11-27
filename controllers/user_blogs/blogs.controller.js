const db = require("../../models");
const Sequelize = require('sequelize');
const fileUpload = require('express-fileupload');
const {
    branches,
    categories
} = require("../../models");
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const crypto = require('crypto');
var handlebars = require('handlebars');
var fs = require('fs');
const {
    User
} = require("loopback");
const Op = Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {
    Session
} = require("inspector");
const Blogs = db.user_blogs;
const Users = db.user;


exports.getAllBlogs = (req, res) => {

    Blogs.findAll({
            where: {
                is_deleted: 0
            },
            include: [{
                    model: db.user,
                    as: "user"
                },
                {
                    model: db.categories
                }

            ]
        })
        .then(blogs => {
            res.status(200).json(blogs);
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        });
};

/* GET ALL BLOGS By User ID */
exports.getBlogsByUserId = (req, res) => {

    Blogs.findAll({
            where: {
                userId: req.body.id,
                is_deleted: 0
            },
            include: [{
                    model: db.user,
                    as: "user"
                },
                {
                    model: db.categories
                }
            ]
        })
        .then(blogs => {
            res.status(200).json(blogs);
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        });
};

/* GET ALL BLOGS By Company ID */
exports.getBlogsByCompanyId = (req, res) => {

    Blogs.findAll({
            where: {
                companyId: req.body.id,
                is_deleted: 0
            },
            include: [{
                    model: db.companies,
                    as: "company"
                },
                {
                    model: db.categories
                }
            ]
        })
        .then(blogs => {
            res.status(200).json(blogs);
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })
        });
};

/* ADD NEW BLOG  */

exports.addNewBlog = (req, res) => {

    Blogs.create(req.body)
        .then(blogs => {
            res.status(200).json({
                success: true,
                categorie: blogs
            });

        }).catch(err => {
            res.status(500).json({
                success: false,
                message: err.message
            })
        });
};

/* EDIT BLOGS  */

exports.editBlog = (req, res) => {
    Blogs.update(req.body, {
        where: {
            id: req.body.id,
        }
    }).then(blog => {
        if (!blog) {
            res.status(200).json({
                message: "Blog not found",
                success: false
            })
        } else {
            res.status(200).json({
                message: "blog was updated successfully",
                success: true
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
}

/* GET BLOG BY ID */

exports.getBlogById = (req, res) => {
    Blogs.findOne({
        where: {
            id: req.body.id
        },

        include: [{
                model: db.user,
                as: "user"
            },
            {
                model: db.categories
            }
        ]

    }).then(blog => {
        if (!blog) {
            res.status(200).json({
                message: "Blog not found"
            });
        } else {
            res.status(200).json(blog)
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}


/* DELETE  BLOG  */

exports.deleteBlog = (req, res) => {

    Blogs.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(blog => {
            if (!blog) {
                res.status(200).json({
                    success: false,
                    message: "Blog not found"
                });
            } else {
                blog.update({
                    is_deleted: 1
                })
                res.status(200).json({
                    success: true,
                    message: "Blog was deleted successfully"
                });
            }
        }).catch(err => {
            res.status(500).json({
                success: false,
                message: err.message
            })
        });
};

exports.getBlogUserPic = (req, res) => {
    const fileName = req.params.name;
    const user = req.params.user;
    let profilepic = fs.readFileSync(
        "./public/images/blogs/" + fileName
    );
    res.status(200).send(profilepic);
};