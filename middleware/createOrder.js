const db = require("../models");
const ROLES = db.ROLES;
const Companies = db.companies;
const Services = db.services;

addJobbers = (req, res, next) => {

};

addServices = (req, res, next) => {

}

const createOrder = {
    addJobbers: addJobbers,
    addServices: addServices,
    addMiddleware: addMiddleWare
};

module.exports = verifyCode;