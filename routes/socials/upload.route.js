const express = require("express");
const router = express.Router();
const controller = require("../../controllers/socials/upload.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/upload/posts", controller.uploadFilesForPosts);

};