const controller = require("../../controllers/admin/keywords/keywords.controller");
const servicesKeyController = require("../../controllers/keywords/serviceKeyWords.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/words/add", controller.createKeywords);
    app.post("/api/words/update", controller.updateWord)
    app.post("/api/words/reference", controller.getAllKeywordsByReferenceId)
    app.post("/api/words/type", controller.getAllKeywordsByType)
    app.get("/api/words/companies", controller.getAllKeywordsForCompanies)
    app.get("/api/services/keywords", servicesKeyController.getAllKeyWords)
    app.post("/api/services/keywords/service", servicesKeyController.getKeysByServiceId)
    app.post("/api/services/keywords/create", servicesKeyController.createKeywords)

}