const db = require("../../models")
const Cashbook = db.cashbook;
const User = db.user;
const mailto = require("../../config/mailServer.config");
var handlebars = require('handlebars');

/* get all cashbook rows */

exports.getAllCashbookData = (req, res) => {
    Cashbook.findAll({
        where: {
            userId: req.body.userId
        },
        include: [{
            model: db.class_accounting,
            as: "class"
        }]
    }).then(data => {
        mailto.readHTMLFile('./templates/invoice_cashbook.html', function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                emailText: "File attachment", //req.body.emailText
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                to: "soufienezouidi@gmail.Com", //req.body.email,
                subject: 'Attchement', //req.body.subject,
                html: htmlToSend,
                attachments: [
                    {
                        filename: '1.png',
                        path: './public/images/banners/1.png',
                        cid: 'uniq-1.png'
                    }
                ]
            };
            mailto.smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    ;
                    callback(error);
                }
            });
        });

        res.status(200).json({
            data: data,
            success: true
        })
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
}


/* add new cashbook */

exports.addNewCashbook = (req, res) => {
    Cashbook.findOne({
        where: {
            userId: req.body.userId
        },
        order: [['id', 'DESC']],
    }).then(cashbook => {
        if (cashbook) {
            var index = 1;
            index += cashbook.index;
            var soldeIn, soldeOut;
            soldeIn = req.body.net + cashbook.solde
            soldeOut = cashbook.solde - req.body.net;
            Cashbook.create({
                description: req.body.description,
                in: req.body.in,
                out: req.body.out,
                tva: req.body.tva,
                solde: req.body.in ? soldeIn : soldeOut,
                is_deleted: 0,
                index: index,
                net: req.body.net,
                brutte: req.body.brutte,
                userId: req.body.userId,
                invoices: req.body.invoices
            })
                .then(data => {
                    res.status(200).json({
                        message: "New cashbook was added successfully",
                        success: true
                    })
                }).catch(err => {
                    res.status(500).json({
                        message: err.message,
                        success: false
                    })
                })
        }
        else {
            var index = 1;
            var soldeIn = 0;
            var soldeOut = 0;
            soldeIn += req.body.net
            soldeOut -= req.body.net;
            Cashbook.create({
                description: req.body.description,
                in: req.body.in,
                out: req.body.out,
                tva: req.body.tva,
                solde: req.body.in ? soldeIn : soldeOut,
                is_deleted: 0,
                index: index,
                net: req.body.net,
                brutte: req.body.brutte,
                userId: req.body.userId,
                invoices: req.body.invoices
            })
                .then(data => {
                    res.status(200).json({
                        message: "New cashbook was added successfully",
                        success: true
                    })
                }).catch(err => {
                    res.status(500).json({
                        message: err.message,
                        success: false
                    })
                })
        }

    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })

}
