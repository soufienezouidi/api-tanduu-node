const express = require("express");
const router = express.Router();
const controller = require("../controllers/file.controller");
const user = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/upload", controller.upload);
    app.get("/files", controller.getListFiles);
    app.get("/files/:name", controller.download);
    app.get("/tanduu/og/:name", user.getLogo);


};