const db = require("../models");
const categories = db.categories;
const sub_categories= db.sub_categories;
const services = db.services;

CategorieExist = (req, res, next) => {
    categories.findOne({
        where: {
        name: req.body.req.body.category
    }
    }).then(categories => {

    })
};

addServices = (req, res, next) => {

}

const createOrder = {
    addJobbers: addJobbers,
    addServices: addServices,
    addMiddleware: addMiddleWare
};

module.exports = verifyCode;
