const db = require("../models");
const Sequelize = require('sequelize');
const fileUpload = require('express-fileupload');
const Categories = db.categories;
const SubCategories = db.sub_categories;
const Services = db.services;
 const nodemailer = require("nodemailer");
const crypto = require('crypto');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
const users_sessionsModel = require("../models/users_sessions.model");
const { User } = require("loopback");
const Blogs = db.blogs;


/*--------------------------------------------*/
/* UPLOAD CATEGORY'S PICTURE  */

/*exports.uploadPictureCategories = (req, res) => {
    console.log(req.params.category_id)

    var category= Categories.findOne({ 
        where: {
            id: req.params.category_id
        }
    }).then(category =>{
        if(!category)
        {
            res.status(200).json({
                saved: false,
                message: "Category not found."
            });
        }
        else
        {
        
            let picture = req.files.picture;
            const pictureName = picture.name;
            const size = picture.data.length;
            const extension = picture.mimetype;
            const allowedExtensions = /png|jpeg|jpg|gif/;
            if(!allowedExtensions.test(extension))
            {
                res.status(200).json({
                    saved: false,
                    message: "Unsupported extension. The picture must have 'png, jpg, jpg or gif' extension"
                });
            }
            if(size > 5000000)
            {
                res.status(200).json({
                    saved: false,
                    message: "picture must be less than 5MB"
                });
            }

            else
            {
                picture.mv('./public/images/categories/category_' + req.params.category_id+".png");

                res.status(200).json({
                    saved: true,
                    message: "Picture was uploaded successfully"
                });
            }

            }
        
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });;
};*/


/* UPLOAD PICTURES FOR BLOGS */

uploadPicturesBlogs = (req, res) => {

    var blog= Blogs.findOne({ 
        where: {
            id: req.body.id
        }
    }).then(blog =>{
        if(!blog)
        {
            res.status(200).json({
                success: false,
                message: "Blog not found."
            });
        }
        else
        {
            let picture = req.files.picture;
            const pictureName = picture.name;
            const size = picture.data.length;
            const extension = picture.mimetype;
            const allowedExtensions = /png|jpeg|jpg|gif/;
            if(!allowedExtensions.test(extension))
            {
                res.status(200).json({
                    saved: false,
                    message: "Unsupported extension. The picture must have 'png, jpg, jpg or gif' extension"
                });
            }
            if(size > 5000000)
            {
                res.status(200).json({
                    saved: false,
                    message: "picture must be less than 5MB"
                });
            }

            else
            {
                picture.mv('./public/images/blogs/blog_' + req.params.category_id+".png");

                res.status(200).json({
                    saved: true,
                    message: "Blog picture was uploaded successfully"
                });
            }

            }
        
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });
}

const uploadPictures = {
    uploadPicturesBlogs: uploadPicturesBlogs,
  };

module.exports = uploadPictures;