const express = require("express");
const router = express.Router();
const controller = require("../../controllers/socials/files.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/post/comment/:userId/:postId/:fileName", controller.loadFileComment);
    app.get("/post/reply/:userId/:postId/:fileName", controller.loadFileCommentReply);

};