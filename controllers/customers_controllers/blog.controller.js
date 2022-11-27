const db = require("../../models");
const Blogs = db.blogs;
const Categories = db.categories;
const Op = db.Sequelize.Op;

const {
    QueryTypes, Sequelize
} = require('sequelize');
const {
    sequelize
} = require("../../models");



/* GET ALL BLOGS */
exports.getBlogs = (req, res) => {

    Blogs.findAll()
        .then(blogs => {
            res.status(200).json(blogs);
        }).catch(err => {
            res.status(500).json({
                message: err.message
            })

        });
};

/* GET BLOG BY ID */
exports.getBlogById = (req, res) => {
    Blogs.findOne({
        where: {
            id: req.body.blog_id
        }
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

/* GET HASHTAGS OF BLOG */

exports.getAllBlogsStats = (req, res) => {
    Blogs.findAll({
        where: {
            is_deleted: 0
        },

        attributes: ['hashtags']
    }).then(blogs => {
        if (!blogs) {
            res.status(200).json({
                message: "Blogs not found"
            });
        } else {
            res.status(200).json({
                hashtags: blogs
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}

/* GET HASHTAGS OF BLOG */

exports.getAllBlogsCategorieStats = (req, res) => {
    /*  records = sequelize.query(
          'SELECT categoryId, count(*) FROM blogs ', {
          type: QueryTypes.SELECT
      }
      )
  
      return res.json(records);*/
    Blogs.findAll({
        distinct: true,
        where: {
            is_deleted: 0
        },
        attributes: ['categoryId', [sequelize.fn('count', sequelize.col('categoryId')), 'numberOfCategory']],
        raw: true,
        group: ['categoryId'],
        include: [{
            model: db.categories,
            required: false
        }],
        distinct: true,
    }).then(blogs => {
        if (!blogs) {
            res.status(200).json({
                message: "Blogs not found"
            });
        } else {
            res.status(200).json({
                stats: blogs
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}

/* GET BLOG BY CATEGORY NAME */
exports.getBlogByCategoryName = (req, res) => {
    Categories.findOne({
        where: {
            category_link: req.params.categoryName
        }
    }).then(category => {
        if (!category) {
            res.status(200).json({
                message: "Category not  not found",
                success: false
            });
        } else {
            Blogs.findAll({
                where: {
                    categoryId: category.id
                }
            }).then(blogs => {
                res.status(200).json({
                    data: blogs,
                    success:true
                })
            }).catch(err => {
                res.status(500).json({
                    message: err.message
                });
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}
