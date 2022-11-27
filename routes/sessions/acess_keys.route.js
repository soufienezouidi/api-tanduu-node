const express = require("express");
const router = express.Router();

const controller = require("../../controllers/access_keys.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/access/code", controller.getAccessbyCode);
    app.post("/api/access/user", controller.getAccessbyUser)
    app.post("/api/access/company", controller.getAccessbyCompany)
    app.post("/api/access/update", controller.updateAccess)
    app.post("/api/access/getaccess", controller.getAccessTokenByInvitation)
}