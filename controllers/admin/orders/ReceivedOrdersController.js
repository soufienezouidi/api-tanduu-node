const db = require("../../../models");
const Sequelize = require('sequelize');
const {received_orders} = require("../../../models");
const Orders = db.orders;
const OrdersServices = db.orders_services;
const Source = db.company_sources;
const OuterCustomer = db.outer_customers;
const Companies = db.companies;
const Services = db.services;
const ReceivedOrder = db.received_orders;
const Team = db.team;

exports.getAllReceievdOrders = (req, res) => {
    ReceivedOrder.findAll({
        where: {
            receiverId: req.body.companyId
        },
        include: [{
            model: db.orders,
            as: "order",
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
        }]
    }).then(received_orders => {
        res.status(200).json({
            received: received_orders
        })
    }).catch(err => {
        res.status(500).json({
            message: err.message,
        })
    })
}

/* GET ALL ORDERS SENT BY THE PARTNER */
exports.updateOrder = (req, res) => {
    ReceivedOrder.update(req.body, {
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
    ReceivedOrder.findOne({
        where: {
            id: req.body.id
        },
        include: [
            {
                model: db.companies,
                as: "sender",
            }
            ,
            {
                model: db.companies,
                as: "receiver",
            },
            {
                model: db.orders,
                as: "order",
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
            }]
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
                success: false
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


/* GET SERVICES BY ORDER ID */
exports.getAllJobsByOrderId = (req, res) => {
    ReceivedOrder.findAll({
        where: {
            orderId: req.body.order_id,
        },
        include: [{
            model: db.orders,
            as: "order"
        }]
    }).then(services => {
        if (!services) {
            res.status(200).json({
                message: "No services found",
                success: false
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