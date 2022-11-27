const db = require("../../../models");
const Sequelize = require('sequelize');
const Orders = db.orders;
const OrdersServices = db.orders_services;
const Source = db.company_sources;
const OuterCustomer = db.outer_customers;
const Companies = db.companies;
const Services = db.services;
const RecievedOrder = db.received_orders;

/* CREATE NEW ORDER */
exports.createOrder = (req, res) => {
    console.log(req.body.arrPartnesrs)
    OuterCustomer.create(req.body.outerObject)
        .then(outerCustomer => {
                Orders.create(req.body.orderObject)
                    .then(newOrder => {
                        newOrder.outerCustomerId = outerCustomer.id;
                        newOrder.reference = new Date().getYear() + "-000" + newOrder.id;
                        newOrder.save();
                        if (req.body.arrServices.length > 1) {
                            req.body.arrServices.forEach(element => {
                                var service = Services.findOne({
                                    where: {
                                        id: element
                                    },
                                    include: [
                                        {
                                            model: db.sub_categories,
                                            include:
                                                [
                                                    {
                                                        model: db.categories
                                                    }
                                                ]
                                        }
                                    ]
                                }).then(service => {
                                    var orders = OrdersServices.create({
                                        categoryId: service.sub_category.category.id,
                                        subCategoryId: service.sub_category.id,
                                        serviceId: service.id,
                                        orderId: newOrder.id,
                                        is_deleted: 0
                                    });
                                });
                            })
                        }
                        if (req.body.arrPartnesrs.length > 0) {
                            console.log(req.body.arrPartnesrs)

                            req.body.arrPartnesrs.forEach(elem => {
                                Companies.findOne({
                                    where: {
                                        id: elem
                                    }
                                }).then(jobber => {
                                    RecievedOrder.create({
                                        status: "New",
                                        invoice_sent: 0,
                                        leadfee: 10,
                                        is_deleted: 0,
                                        notes: [],
                                        orderId: newOrder.id,
                                        senderId: newOrder.companyId,
                                        receiverId: jobber.id
                                    }).then(jobbers => {

                                    })
                                });
                            });
                        }
                    })
            }
        ).catch(err => {
        res.status(500).json({
            message: err.message,
        })
    })
}


/* FILTER PARTNER BY ADDRESS */
exports.filterPartners = (req, res) => {


};

/* GET ALL ORDERS SENT BY THE PARTNER */
exports.getAllSentOrder = (req, res) => {
    Orders.findAll({
        where: {
            companyId: req.body.company_id
        },
        include: [
            {
                model: db.outer_customers,
                as: 'outerCustomer'
            },
            {
                model: db.companies,
                as: 'jobberSender'
            },
            {
                model: db.companies,
                as: 'jobberAccepted'
            }
        ]
    }).then(orders => {
        if (!orders) {
            res.status(200).json({
                message: "No orders found",
            });
        } else {
            res.status(200).json({
                data: orders
            });
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
        })
    })
}

/* GET ALL ORDERS SENT BY THE PARTNER */
exports.updateOrder = (req, res) => {
    Orders.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(orders => {
        if (!orders) {
            res.status(200).json({
                message: "No order found",
            });
        } else {
            res.status(200).json(orders);
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
        })
    })
}


/* GET ALL ORDERS SENT BY THE PARTNER */
exports.getOrderById = (req, res) => {
    Orders.findOne({
        where: {
            id: req.body.order_id
        }
    }).then(order => {
        if (!order) {
            res.status(200).json({
                message: "No order found",
            });
        } else {
            res.status(200).json(order);
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
        })
    })
};

/* GET SERVICES BY ORDER ID */
exports.getServicesByOrderById = (req, res) => {
    OrdersServices.findAll({
        where: {
            orderId: req.body.order_id,
            is_deleted: 0
        },
        include: [{
            model: db.services,
        },
            {
                model: db.categories,
            },
            {
                model: db.sub_categories
            }]
    }).then(services => {
        if (!services) {
            res.status(200).json({
                message: "No services found",
            });
        } else {
            res.status(200).json(services);
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
        })
    })
}


/* UPDATE SERVICES BY ORDER ID */
exports.createOrUpdateService = (req, res) => {
    OrdersServices.findOne({
        where: {
            orderId: req.body.orderId,
            serviceId: req.body.serviceId
        }
    }).then(service => {
        if (!service) {
            OrdersServices.create(req.body)
                .then(data => {
                    res.status(200).json({
                        service: data,
                    });
                }).catch(err => {
                res.status(200).json({
                    message: err.message,
                    success: false
                });
            })
        } else {
            service.update(req.body).then(data => {
                res.status(200).json({
                    service: data,
                });
            }).catch(err => {
                res.status(200).json({
                    message: err.message,
                    success: false
                });
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
        })
    })
}
