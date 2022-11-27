const db = require("../../models")
const Contact = db.contacts;
const User = db.user;
const Company = db.companies;

/* get contacts of user */
exports.getContacts = (req, res) => {
    Contact.findOne({
            where: {
                userId: req.body.id
            },
            include: [{
                model: db.user,
                as: "user"
            }]
        })
        .then(contact => {
            res.status(200).json(contact);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get contacts of user */
exports.getContactsObject = (req, res) => {
    Contact.findOne(req.body, {
            include: [{
                model: db.user,
                as: "user"
            }]
        })
        .then(contact => {
            res.status(200).json(contact);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};


exports.updatePage = (req, res) => {
    Contact.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(page => {
            if (!page) {

                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {

                res.status(200).json({
                    contact: page,
                    success: true,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            });
        });
}

/* get contacts of user */
exports.getContactsCompany = (req, res) => {
    Contact.findOne({
            where: {
                companyId: req.body.id
            },
            include: [{
                model: db.companies,
                as: "company"
            }]
        })
        .then(contact => {
            res.status(200).json(contact);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};