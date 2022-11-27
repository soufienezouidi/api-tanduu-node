const db = require("../../models");
const Sequelize = require('sequelize');
const fileUpload = require('express-fileupload');
const {
    sub_categories
} = require("../../models");
const Categories = db.categories;
const SubCategories = db.sub_categories;
const Services = db.services;
const Op = db.Sequelize.Op;

const {
    QueryTypes
} = require('sequelize');

const {
    sequelize
} = require("../../models");


/*----------------------------------------*/
/* GET ALL CATEGORIES */
exports.getAllCategories = (req, res) => {
    Categories.findAll({
            where: {
                is_accepted: 1,
                is_deleted: 0
            }
        })
        .then(categories => {
            res.status(200).json(categories)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};
exports.getcategorybyid = (req, res) => {
    Categories.findOne({
            where: {
                id: req.body.category_id
            },

        })
        .then(sub => {
            res.status(200).json(sub)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};
exports.getcategorybyname = (req, res) => {
    Categories.findOne({
            where: {
                category_link: req.body.name
            },

        })
        .then(sub => {
            res.status(200).json(sub)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};
/*----------------------------------------*/
/* GET SUB-CATEGORIES */
exports.getSubByCategoryId = (req, res) => {
    SubCategories.findAll({
            where: {
                categoryId: req.body.category_id
            },

        })
        .then(sub => {
            res.status(200).json(sub)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};

/*----------------------------------------*/
/* GET SUB-CATEGORIES */
exports.getServicesBySubCategoryId = (req, res) => {
    Services.findAll({
            where: {
                is_accepted: 1,
                is_deleted: 0,
                subCategoryId: req.body.sub_id
            },
        })
        .then(services => {
            res.status(200).json(services)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};
exports.getServiceById = (req, res) => {
    Services.findOne({
            where: {
                is_accepted: 1,
                is_deleted: 0,
                id: req.body.id
            },
        })
        .then(services => {
            res.status(200).json(services)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};

exports.getAllServices = (req, res) => {
    /* const id = req.body.commercial_id
     records = sequelize.query(
         'SELECT * FROM `services` as `s`, `sub_categories` as `sub`, `categories` as `c` WHERE `sub`.`categoryId` = 7 GROUP BY `sub`.`categoryId`', {
             type: QueryTypes.SELECT
         }
     )
     /*   res.status(200).json({
            res: records,
            success: true
        })
 
     return res.json(records);*/
    Services.findAll({
            where: {
                is_accepted: 1,
                is_deleted: 0,
            },
            include: [{
                model: db.sub_categories,
                include: [{
                    model: db.categories
                }]
            }]
        })
        .then(services => {
            res.status(200).json(services)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
}

/*----------------------------------------*/
/* GET SERVICE BY CATEGORY */
exports.getServicesByCategoryId = (req, res) => {
    Categories.findAll({
            where: {
                is_accepted: 1,
                is_deleted: 0,
                id: req.body.category_id

            },
            include: [{
                model: db.sub_categories,
                where: {
                    is_accepted: 1,
                    is_deleted: 0
                },
                include: [{
                    model: db.services,
                    where: {
                        is_accepted: 1,
                        is_deleted: 0
                    },
                }, ]
            }, ]
        })
        .then(categories => {
            res.status(200).json(categories)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};
exports.addNewCatgory = (req, res) => {

    var Categories = Categories.findOne({
            where: {
                name: req.body.name_en
            }
        }).then(category => {
            if (category) {
                res.status(200).json({
                    success: false,
                    message: "Category is already exist."
                });
            } else {
                Categories.create({
                    name: req.body.name_en,
                    is_deleted: 0,
                    is_accepted: 1,
                    most_relevent: 0,
                    languages: {
                        'name_en': req.body.name_en,
                        'name_fr': req.body.name_fr,
                        'name_de': req.body.name_de
                    }

                }).then(data => {

                    res.status(200).json({
                        success: true,
                        categorie: data
                    });

                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};
