const express = require("express");
const router = express.Router();
const controller = require("../controllers/chat.controller");
global.__basedir = __dirname;
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/chat/getfilename", controller.getchatfilebyidusers);
    app.post("/api/chat/createlog", controller.createfilelog);
    app.get("/api/chat/:type/:name", controller.getConversationPath);
    app.post("/api/chat/getcontacts", controller.getallcontacts);

};