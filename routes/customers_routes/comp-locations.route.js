const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/account/locations&services/LocationsController");
global.__basedir = __dirname;
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/customer/location/getbycompid", controller.getLocationsByCompId);


};