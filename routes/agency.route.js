const controller = require("../controllers/agency.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/api/agency/my-articles", controller.allArticles);
  app.post("/api/agency/create/article", controller.createNewArticle);
  app.get('/api/agency/my-articles/show/:id',controller.showArticleById);
  
};