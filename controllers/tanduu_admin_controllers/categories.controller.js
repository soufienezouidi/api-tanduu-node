const db = require("../../models");
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
const users_sessionsModel = require("../../models/users_sessions.model");
const {
    User
} = require("loopback");
const {
    categories
} = require("../../models");



/* CONFIGURATION MAIL SERVER */
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "0c82ad1e88768e",
        pass: "3d00f12dbeeb84"
    }
});
smtpTransport = nodemailer.createTransport(smtpTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "0c82ad1e88768e",
        pass: "3d00f12dbeeb84"
    }
}));

/*----------------------------------------*/


/* FUNCTION TO READ FILE */

var readHTMLFile = function (path, callback) {
    fs.readFile(path, {
        encoding: 'utf-8'
    }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};


/*----------------------------------------*/
/* GET ALL CATEGORIES */
exports.getAllCategories = (req, res) => {
    Categories.findAll()
        .then(categories => {
            res.status(200).json(categories)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};

/*--------------------------------------------*/
/* ADD NEW CATEGORY */

exports.addNewCatgory = (req, res) => {

    var category = Categories.findOne({
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
                    category_link: req.body.category_link,
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

exports.getcategorybyid = (req, res) => {
    Categories.findOne({
        where: {
            id: req.body.categ_id
        }
    }).then(categ => {
        if (!categ) {
            res.status(200).json({
                message: "Blog not found"
            });
        } else {
            res.status(200).json(categ)
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    })
}
/*--------------------------------------------*/
/* EDIT CATEGORY */
exports.updatecateg = (req, res) => {
    Categories.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(categ => {
        if (!categ) {
            res.status(200).json({
                message: "category not found",
                success: false
            })
        } else {
            res.status(200).json({
                message: "category  was updated successfully",
                success: true
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
};

exports.editCategory = (req, res) => {

    var category = Categories.findOne({
            where: {
                id: req.body.user_id
            }
        })
        .then(category => {
            if (!category) {
                res.status(200).json({
                    success: false,
                    message: "Category not found"
                });
            } else {
                category.update({
                    name: req.body.name_en,
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


/*--------------------------------------------*/
/* ENABEL DISABLE CATEGORY */
exports.enableCategory = (req, res) => {

    Categories.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(category => {
            if (!category) {
                res.status(200).json({
                    message: "Catgeory not found",
                    success: false
                })
            } else {
                category.is_deleted = req.body.is_deleted;
                category.save();
                if (req.body.is_deleted) {
                    res.status(200).json({
                        message: "Category was disabled successfully",
                        success: true
                    })
                } else {
                    res.status(200).json({
                        message: "Category was enabled successfully",
                        success: true
                    })
                }
            }
        });
}

/*--------------------------------------------*/
/* ACCEPT CATEGORY */

exports.acceptCategory = (req, res) => {

    var category = Categories.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(category => {
            if (!category) {
                res.status(200).json({
                    success: false,
                    message: "Category not found"
                });
            } else {
                category.update({
                    is_accepted: req.body.is_accepted,
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


/*--------------------------------------------*/
/* UPLOAD CATEGORY'S PICTURE  */

exports.uploadPictureCategories = (req, res) => {


    var category = Categories.findOne({
        where: {
            id: req.params.category_id
        }
    }).then(category => {
        if (!category) {
            res.status(200).json({
                saved: false,
                message: "Category not found."
            });
        } else {

            let picture = req.files.picture;
            const pictureName = picture.name;
            const size = picture.data.length;
            const extension = picture.mimetype;
            const allowedExtensions = /png|jpeg|jpg|gif/;
            if (!allowedExtensions.test(extension)) {
                res.status(200).json({
                    success: false,
                    message: "Unsupported extension. The picture must have 'png, jpg, jpg or gif' extension"
                });
            }
            if (size > 5000000) {
                res.status(200).json({
                    success: false,
                    message: "picture must be less than 5MB"
                });
            } else {
                picture.mv('./public/images/categories/category_' + req.params.category_id + ".png");

                res.status(200).json({
                    success: true,
                    message: "Picture was uploaded successfully"
                });
            }

        }

    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });;
};



/*----------------------------------------*/
/* GET ALL sub-categories */
exports.getAllSubCategories = (req, res) => {
    SubCategories.findAll({
            include: [{
                model: Categories
            }]
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

exports.updatesub = (req, res) => {
    SubCategories.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(subcateg => {
        if (!subcateg) {
            res.status(200).json({
                message: "category not found",
                success: false
            })
        } else {
            res.status(200).json({
                message: "category  was updated successfully",
                success: true
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
};

/*--------------------------------------------*/
/* ADD NEW SUB-CATEGORY */

exports.addNewSubCatgory = (req, res) => {

    var sub_category = SubCategories.findOne({
            where: {
                name: req.body.name_en
            }
        }).then(category => {
            if (category) {
                res.status(200).json({
                    success: false,
                    message: "Sub-category is already exist."
                });
            } else {
                SubCategories.create({
                    name: req.body.name_en,
                    is_deleted: 0,
                    is_accepted: 1,
                    most_relevent: 0,
                    languages: {
                        'name_en': req.body.name_en,
                        'name_fr': req.body.name_fr,
                        'name_de': req.body.name_de
                    },
                    categoryId: req.body.category_id

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


/*--------------------------------------------*/
/* EDIT SUB-CATEGORY */

exports.editSubCategory = (req, res) => {

    var category = SubCategories.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(sub => {
            if (!sub) {
                res.status(200).json({
                    success: false,
                    message: "Sub-category not found"
                });
            } else {
                sub.update({
                    name: req.body.name_en,
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


/*--------------------------------------------*/
/* ACCEPT SUB-CATEGORY */

exports.acceptSubCategory = (req, res) => {

    var category = SubCategories.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(sub => {
            if (!sub) {
                res.status(200).json({
                    success: false,
                    message: "Sub-category not found"
                });
            } else {
                sub.update({
                    is_accepted: req.body.is_accepted,
                }).then(data => {
                    res.status(200).json({
                        success: true,
                        sub_categorie: data
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


/*--------------------------------------------*/
/* ENABEL DISABLE SUB-CATEGORY */
exports.enableSubCategory = (req, res) => {

    SubCategories.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(sub => {
            if (!sub) {
                res.status(200).json({
                    message: "Sub-Catgeory not found",
                    success: false
                })
            } else {
                sub.is_deleted = req.body.is_deleted;
                sub.save();
                if (req.body.is_deleted) {
                    res.status(200).json({
                        message: "Sub Category was disabled successfully",
                        success: true
                    })
                } else {
                    res.status(200).json({
                        message: "Sub Category was enabled successfully",
                        success: true
                    })
                }
            }
        });
}

/*--------------------------------------------*/
/* UPLOAD SUB-CATEGORY'S PICTURE */

exports.uploadPictureSubCategories = (req, res) => {


    var category = SubCategories.findOne({
        where: {
            id: req.params.sub_id
        }
    }).then(category => {
        if (!category) {
            res.status(200).json({
                success: false,
                message: "Sub-Category not found."
            });
        } else {

            let picture = req.files.picture;
            const pictureName = picture.name;
            const size = picture.data.length;
            const extension = picture.mimetype;
            const allowedExtensions = /png|jpeg|jpg|gif/;
            if (!allowedExtensions.test(extension)) {
                res.status(200).json({
                    success: false,
                    message: "Unsupported extension. The picture must have 'png, jpg, jpg or gif' extension"
                });
            }
            if (size > 5000000) {
                res.status(200).json({
                    success: false,
                    message: "Picture must be less than 5MB"
                });
            } else {
                picture.mv('./public/images/sub_categories/sub_category_' + req.params.sub_id + ".png");

                res.status(200).json({
                    success: true,
                    message: "Picture was uploaded successfully"
                });
            }

        }

    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });;
};


/*----------------------------------------*/
/* GET ALL Services */
exports.getAllServices = (req, res) => {
    Services.findAll({
            include: [{
                model: SubCategories,
                include: [Categories]
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
};
exports.getAllServicesbysub = (req, res) => {
    Services.findAll({
            where: {
                subCategoryId: req.body.sub_id
            },
            include: [{
                model: SubCategories,
                include: [Categories]
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
};
/*--------------------------------------------*/
/* ADD NEW SERVICE */

exports.addNewService = (req, res) => {

    var service = Services.findOne({
            where: {
                name: req.body.name_en,
                subCategoryId: req.body.sub_id
            }
        }).then(service => {
            if (service) {
                res.status(200).json({
                    success: false,
                    message: "Service is already exist."
                });
            } else {
                Services.create({
                    name: req.body.name_en,
                    is_deleted: 0,
                    is_accepted: 1,
                    most_relevent: 0,
                    languages: {
                        'name_en': req.body.name_en,
                        'name_fr': req.body.name_fr,
                        'name_de': req.body.name_de
                    },
                    subCategoryId: req.body.sub_id

                }).then(data => {

                    res.status(200).json({
                        success: true,
                        serivce: data
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

/*--------------------------------------------*/
/* EDIT SERVICE */

exports.editService = (req, res) => {

    var category = Services.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(serivce => {
            if (!serivce) {
                res.status(200).json({
                    success: false,
                    message: "Service not found"
                });
            } else {
                serivce.update({
                    name: req.body.name_en,
                    languages: {
                        'name_en': req.body.name_en,
                        'name_fr': req.body.name_fr,
                        'name_de': req.body.name_de
                    }

                }).then(data => {
                    res.status(200).json({
                        success: true,
                        serivce: data
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });;
};

exports.updateservice = (req, res) => {
    Services.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(subcateg => {
        if (!subcateg) {
            res.status(200).json({
                message: "service not found",
                success: false
            })
        } else {
            res.status(200).json({
                message: "service  was updated successfully",
                success: true
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
};
/*--------------------------------------------*/
/* ACCEPT SERVICE */

exports.acceptService = (req, res) => {

    var category = Services.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(serivce => {
            if (!serivce) {
                res.status(200).json({
                    success: false,
                    message: "Service not found"
                });
            } else {
                User.findOne({ // Find User by email
                        where: {
                            id: req.body.user_id
                        }
                    })
                    .then(user => {
                        if (!user) {
                            res.status(200).json({
                                success: false,
                                serivce: "User not found"
                            });
                        } else {
                            if (req.body.code == user.code) {
                                serivce.is_accepted = req.body.is_accepted;
                                serivce.save();
                                res.status(200).json({
                                    success: true,
                                    serivce: "Service was updated successfully"
                                });
                            } else {
                                res.status(200).json({
                                    success: false,
                                    serivce: "You enter wrong code"
                                });
                            }
                        }
                    })
            }
        }).catch(err => {
            res.status(500).json({
                message: err.message
            });
        });;
};

/*--------------------------------------------*/
/* ENABEL DISABLE SERVICE */
exports.enableService = (req, res) => {

    Services.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(service => {
            if (!service) {
                res.status(200).json({
                    message: "Service not found",
                    success: false
                })
            } else {
                service.is_deleted = req.body.is_deleted;
                service.save();
                if (req.body.is_deleted) {
                    res.status(200).json({
                        message: "Service was disabled successfully",
                        success: true
                    })
                } else {
                    res.status(200).json({
                        message: "Service was enabled successfully",
                        success: true
                    })
                }
            }
        });
}