const controller = require("../../controllers/socials/contact.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/contacts/user", controller.getContacts);
    app.post("/api/contacts/object", controller.getContactsObject);
    app.post("/api/contacts/companies", controller.getContactsCompany);
    app.post("/api/contacts/update", controller.updatePage);
};