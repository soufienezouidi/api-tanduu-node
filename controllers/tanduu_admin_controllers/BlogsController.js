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


/* GET ALL BLOGS */
exports.getBlogs = (req, res) => {

    Blogs.findAll({
            where: {
                userId: req.body.id
            }
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

exports.addBlog = (req, res) => {

    Blogs.create(req.body
            /*{
                    title: req.body.title,
                    description: req.body.description,
                    hashtags: req.body.hashtags,
                    is_deleted: 0,
                    subCategoryId: req.body.subCategoryId,
                    categoryId: req.body.categoryId,
                    author: req.body.author,
                    introduction: req.body.introduction,
                    languages: req.body.languages
                }*/
        )
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

/* EDIT NEW BLOGS  */

exports.editBlog = (req, res) => {
    Blogs.update(req.body, {
        where: {
            id: req.body.id,
        }
    }).then(group => {
        if (!group) {
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
        id: req.body.blog_id
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
                id: req.body.blog_id
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