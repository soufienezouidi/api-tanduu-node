const express = require("express");
const router = express.Router();
const controller = require("../../controllers/customers_controllers/suggested_category.controller");
global.__basedir = __dirname;
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/partner/suggest", controller.suggestnewcategory);
    app.post("/api/partner/getownsuggestions", controller.getsuggestionbyuser);
    app.post("/api/suggestions/getall", controller.getallsuggestions);
    app.post("/api/suggestions/identifier", controller.getSuggestionById);
    app.post("/api/suggestions/update", controller.updateSuggest);


};
