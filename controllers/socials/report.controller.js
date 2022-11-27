const db = require('../../models');
const Report = db.reports;
const ReportCategories = db.reports_categories;
/* create report   */
exports.createReport = (req, res) => {
    Report.create(req.body).then(report => {
            if (!report) {
                res.status(200).json({
                    message: "report not exist",
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: report,
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

/* get all reporter categories */
exports.getAllReportersCategories = (req, res) => {
    ReportCategories.findAll({
            where: {
                is_deleted: false,
            },
            include: [{
                model: db.reports_sub_categories
            }]
        }).then(reports => {

            res.status(200).json({
                data: reports,
                success: true,
            });


        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            });
        });
}