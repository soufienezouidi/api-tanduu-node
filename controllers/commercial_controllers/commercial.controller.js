const db = require("../../models");
const Commercials = db.commercial;
const User = db.user;
const Company = db.companies;
const Commercial_feed = db.commercial_feed;
var bcrypt = require("bcryptjs");
const Role = db.role;
const Op = db.Sequelize.Op;

const {
    QueryTypes
} = require('sequelize');
const {
    Sequelize
} = require('sequelize');

const {
    sequelize
} = require("../../models");
/*----------------------------------------*/
/* GET COMMERCIAL */
exports.getAllCommercials = (req, res) => {
    Commercials.findAll({
        include: [{
            model: db.user
        }]
    })
        .then(commercials => {
            res.status(200).json(commercials)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};





/*----------------------------------------*/
/* GET COMMERCIAL BY ID */
exports.getcommercialById = (req, res) => {
    Commercials.findOne({
        where: {

            is_deleted: 0,
            id: req.body.commercial_id
        },
        include: [{
            model: db.user
        }]

    })
        .then(com => {
            res.status(200).json(com)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};



/*----------------------------------------*/
/* GET COMMERCIAL BY ID */
exports.getcommercialByUserId = (req, res) => {
    Commercials.findOne({
        where: {

            is_deleted: 0,
            userId: req.body.user_id
        },
        include: [{
            model: db.user
        }]

    })
        .then(com => {
            res.status(200).json(com)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};

/*----------------------------------------*/
/* GET com by code */
exports.getcommercialByCode = (req, res) => {
    Commercials.findOne({
        where: {
            is_deleted: 0,
            code: req.body.code
        },
        include: [{
            model: db.user
        }]

    })
        .then(com => {
            res.status(200).json(com)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};
/*----------------------------------------*/
/* EDIT COMMERCILA */
exports.update = (req, res) => {
    Commercials.update(req.body, {
        where: {
            id: req.body.id
        }
    }).then(commercial => {
        if (!commercial) {
            res.status(200).json({
                message: "Commercial not found",
                success: false
            })
        } else {
            res.status(200).json({
                message: "Commercial account was update successfully",
                success: true
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
};

/*----------------------------------------*/
/* GET CONTRACT BY COMMERCIAL ID */
exports.getContractByCommercialId = (req, res) => {
    Commercial_feed.findAll({
        where: {
            commercialId: req.body.commercial_id,
        },
        include: [{
            model: db.commercial,
            include: [{
                model: db.user
            }]
        }]

    })
        .then(com_feed => {
            res.status(200).json(com_feed)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });

};


/*----------------------------------------*/
/* GET CONTRACT BY COMMERCIAL ID */
exports.AddContarct = (req, res) => {
    Company.findOne({
        where: {
            userId: req.body.client.id,
        },
        include: [{
            model: db.user,
        }]
    })
        .then(company => {
            Commercial_feed.create({
                commercialId: req.body.commercial_id,
                client: company
            })
                .then(com_feed => {
                    res.status(200).json({
                        message: "New conrtact was created successfully",
                        success: true
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: err.message
                    });
                });

        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
}

/*---------------------------------------------*/
/* COUNT SUM OF COMMERCIAL'S INCOMES */

exports.getCommercialIncome = async (req, res) => {
    const id = req.body.commercial_id
    records = await sequelize.query(
        'SELECT SUM(income) FROM `commercial_feeds` WHERE commercialId = ' + id, {
        replacements: ['active'],

        type: QueryTypes.SELECT
    }
    );
    res.status(200).json({
        res: records,
        success: true
    })
}


exports.getCommercialtodayIncome = async (req, res) => {
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();

    const SUM = await Commercial_feed.sum('income', {
        where: {
            createdAt: {
                [Op.gt]: TODAY_START,
            },
            commercialId: req.body.commercial_id
        },
    });
    res.status(200).json({
        res: SUM,
        success: true
    })

}