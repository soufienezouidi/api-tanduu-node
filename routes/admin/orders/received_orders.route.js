const controller = require("../../../controllers/admin/orders/ReceivedOrdersController");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /* CREATE NEW ORDER BY THE PARTNER */
    //app.post("/api/admin/orders/sent/create", controller.createOrder);

    /* GET ALL ORDERS SENT BY THE PARTNER */
    app.post("/api/admin/orders/received", controller.getAllReceievdOrders);

    /* update sent orders */
    app.post("/api/admin/orders/received/update", controller.updateOrder);

    /* get order by id */
    app.post("/api/admin/orders/received/view-order", controller.getOrderById);


    /* get service by order id */
    app.post("/api/admin/orders/received/view-order/services", controller.getServicesByOrderById);
    app.post("/api/admin/orders/received/view-order/allJobs", controller.getAllJobsByOrderId);

    /* get service by order id */
    // app.post("/api/admin/orders/sent/view-order/services/new-update", controller.createOrUpdateService);

};