const express = require("express");
const router = express.Router();

const controller = require("../../controllers/server-side/sessions.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/getlog", controller.getsessions)
}