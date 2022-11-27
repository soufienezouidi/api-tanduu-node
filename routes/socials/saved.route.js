const controller = require("../../controllers/socials/saved.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/saved/collections/user", controller.getSavedCollectionsOfUser);
    app.post("/api/saved/collections/user/name", controller.getSavedCollectionsOfUserItems);
    app.post("/api/saved/collections/create", controller.createCollection);
    app.post("/api/saved/collections/update", controller.updateCollection);
    app.post("/api/saved/item/user", controller.getSavedItemsOfUser);
    app.post("/api/saved/item/user/post", controller.getItemByPostAndUser);
    app.post("/api/saved/item/create", controller.createSavedItems);
    app.post("/api/saved/item/update", controller.updateSavedItem);
    app.post("/api/saved/item/collection", controller.getItemsOfCollections);
};