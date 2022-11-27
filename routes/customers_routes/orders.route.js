const controller = require("../../controllers/customer-order.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    }); /* GET ALL CATEGORIES */
    app.post("/api/customers/orders/send",
        controller.createOrder);
    app.post("/api/customers/orders/getbysender",
        controller.getordersByuserId);
    app.post("/api/customers/orders/getbyid",
        controller.getOrderbyid);
    app.post("/api/customers/orders/getby_sender_and_jobber",
        controller.getordersByuserAndCompany);
    app.post("/api/customers/customer/getbyuser",
        controller.getcustomerbyuserid);
    app.post("/api/customers/customer/getorderservices",
        controller.getServicesByOrderById);
}