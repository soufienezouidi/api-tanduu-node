const express = require("express");

const controller = require("../../controllers/interests/interests.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/interests/create", controller.createInterest);
    app.post("/api/interests/update", controller.updateInterest);
    app.get("/api/interests/all", controller.getAllInterests);
    app.post("/api/interests/user", controller.associateInterests);
    app.get("/api/interests/pic/:name", controller.getInterestPic);
    app.post("/api/interests/identifiant", controller.getInterestById);
}