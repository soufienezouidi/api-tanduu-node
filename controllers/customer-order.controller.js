const db = require("../models");
const Sequelize = require('sequelize');
const Orders = db.orders;

const Information = db.company_urgent_informations;
const OrdersServices = db.orders_services
const Services = db.services
const RecievedOrders = db.received_orders
const Customers = db.customers
exports.createOrder = (req, res) => {
    console.log(req.body.services)
    // orders details
    var street = req.body.street;
    var street_nb = req.body.street_nb;
    var bloc = req.body.bloc;
    var appartment = req.body.appartment;
    var zip_code = req.body.zip_code;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var appointment = req.body.appointment;
    var description = req.body.description;
    // customer details
    var customerId = req.body.customerId
    var services = req.body.services;

    var list_jobber = req.body.list_jobbers;
    var array_jobbers = [];
    var share_number = false

    //create order
    Orders.create({
        //appointment_date: new Date(appointment),
        status: "Neu",
        show_mobile: share_number,
        description: description,
        customerId: req.body.customerId,
        jobberId: req.body.jobberId,

        location: {
            "street": street,
            "street_nb": street_nb,
            "bloc": bloc,
            "appartment": appartment,
            "zip_code": zip_code,
            "city": city,
            "state": state,
            "country": country,
            "longitude": req.body.longitude,
            "latitude": req.body.latitude,

        }
    }).then(new_order => {
        new_order.reference = new Date().getYear() + "-000" + new_order.id;
        new_order.save();
        if (services) {
            for (var i = 0; i < services.length; i++) {

                var service = Services.findOne({
                    where: {
                        id: parseInt(services[i])
                    },
                    include: [{
                        model: db.sub_categories,
                        include: [{
                            model: db.categories
                        }]
                    }]
                }).then(service => {
                    var orders = OrdersServices.create({

                        categoryId: service.sub_category.category.id,
                        subCategoryId: service.sub_category.id,
                        serviceId: service.id,
                        orderId: new_order.id,
                        is_deleted: 0

                    });
                });

            }
        }
        var orid = new_order.id
        var bycustomer = true
        RecievedOrders.create({

            status: "Neu",
            show_mobile: share_number,
            is_deleted: false,
            orderId: orid,
            By_customer: true,

            receiverId: req.body.companyId

        }).then(new_order_rec => {
            if (new_order_rec) {
                res.status(200).json({
                    message: "order sent"
                });
            }
        }).catch(err => {
            res.status(500).json({
                message: err.message
            });
        });;
    }).catch(err => {
        res.status(500).json({
            message: err.message
        });
    });;



}
exports.getcustomerbyuserid = (req, res) => {
    Customers.findOne({
        where: {
            userId: req.body.user_id
        },

    }).then(customer => {
        if (!customer) {
            res.status(200).json({
                message: "Company not found with userId " + req.body.user_id
            })
        } else {
            res.status(200).json(customer)
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    })

};

exports.getordersByuserId = (req, res) => {
    Orders.findAll({
            where: {
                customerId: req.body.idcus,

            },
            include: [{
                model: db.companies,
                as: "jobberAccepted"
            }]
        })
        .then(orders => {
            res.status(200).json(orders)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};
exports.getOrderbyid = (req, res) => {
    Orders.findAll({
            where: {
                id: req.body.id,

            },
            include: [{
                model: db.companies,
                as: "jobberAccepted"
            }]
        })
        .then(orders => {
            res.status(200).json(orders)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};
exports.getordersByuserAndCompany = (req, res) => {
    Orders.findAll({
            where: {
                customerId: req.body.idcus,
                jobberId: req.body.idjob,
            },
            include: [{
                model: db.companies,
                as: "jobberAccepted"
            }]
        })
        .then(orders => {
            res.status(200).json(orders)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

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
            }
        ]
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