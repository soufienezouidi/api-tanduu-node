const express = require("express");
const router = express.Router();
const controller = require("../controllers/company_chat.controller");
global.__basedir = __dirname;
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/chat_company/getfilename", controller.getchatfilebyidcompany);
    app.post("/api/chat_company/createlog", controller.createteamfilelog);
    app.get("/api/chat_company/:type/:name", controller.getConversationPath);
    app.post("/api/chat_company/group/chat/create", controller.createGroupChat);
    app.post("/api/chat_company/group/chat/identifier", controller.getGroupChatByUser)
    app.get("/api/chat_company/group/chat/rooms", controller.getAllRooms)
    ;
};