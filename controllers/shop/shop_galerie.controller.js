const db = require("../../models");
const fs = require("fs");
const User = db.user;
const Product = db.products_company;
const Gallery = db.galleries;

/* EXPORT ALL PRODUCTS */
exports.allProducts = (req, res) => {
    Product.findOne({
        where: {
            companyId: req.body.companyId
        }
    }).then(products => {
        res.status(200).json({
            products: products,
            success: true
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message,
            success: false
        });
    });
};


/* Edit PRODUCT */

exports.updateProduct = (req, res) => {
    Product.findOne({
            where: {
                companyId: req.body.companyId,
            }
        })
        .then(prod => {
            if (prod) {
                Product.update(req.body, {
                    where: {
                        id: prod.id
                    }
                }).then(found => {
                    res.status(200).json({
                        prod: prod,
                        success: true
                    });
                }).catch(err => {
                    res.status(500).send({
                        message: err.message,
                        success: false
                    });
                })

            } else {
                res.send({
                    message: `Cannot update product!`,
                    success: false
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message,
                success: false
            });
        });
}

/* get picture product*/
exports.getProductPicture = (req, res) => {
    const type = req.params.type;
    const fileName = req.params.name;
    let productPicture = fs.readFileSync('./public/images/user/user' + type + '/company' + req.params.company + '/products/' + fileName)
    res.status(200).send(productPicture)
}


/* EXPORT ALL GALLERIES */
exports.allGallery = (req, res) => {
    Gallery.findAll({
        where: {
            companyId: req.body.companyId,
            is_deleted: 0
        }
    }).then(galleries => {
        res.status(200).json({
            galleries: galleries,
            success: true
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message,
            success: false
        });
    });
};

/* create catalog */
exports.createCatalog = (req, res) => {
    Gallery.create(req.body).then(gallery => {
        res.status(200).json({
            gallery: gallery,
            success: true
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message,
            success: false
        });
    })
}

/* Edit PRODUCT */
exports.UpdateGallery = (req, res) => {
    Gallery.findOne({
            where: {
                id: req.body.id
            }
        })
        .then(gallery => {
            if (gallery) {
                Gallery.update(req.body, {
                    where: {
                        id: gallery.id
                    }
                }).then(found => {
                    res.status(200).json({
                        prod: gallery,
                        success: true
                    });
                }).catch(err => {
                    res.status(500).send({
                        message: err.message,
                        success: false
                    });
                })

            } else {
                res.send({
                    message: `Cannot update Gallerie!`,
                    success: false
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message,
                success: false
            });
        });
}

/* get picture galleries*/
exports.getPictureFile = (req, res) => {
    const type = req.params.type;
    const fileName = req.params.name;
    let productPicture = fs.readFileSync('./public/images/user/user' + type + '/company' + req.params.company + '/galleries/' + fileName)
    res.status(200).send(productPicture)
}