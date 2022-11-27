const controller = require("../../controllers/chat/chatController");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* GET PATH OF CONVERSATION */

    app.get("/api/chat/path", controller.getConversationPath);
    app.get("/api/chat/:type/:name", controller.getConversationPath);
}