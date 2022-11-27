const express = require("express");
const router = express.Router();
const controller = require("../../controllers/shop/shop_galerie.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/user/products", controller.allProducts);
    app.post("/api/user/gallery/update", controller.UpdateGallery);
    app.post("/api/user/gallery/create", controller.createCatalog);
    app.post("/api/user/gallery", controller.allGallery);
    app.post("/api/user/product/update", controller.updateProduct);
    app.get("/api/user/products/:type/:company/:name", controller.getProductPicture);
    app.get("/api/user/gallery/:type/:company/:name", controller.getPictureFile);


};