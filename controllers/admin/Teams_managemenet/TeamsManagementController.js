const { teams } = require("../../../models");
const db = require("../../../models");
const Team = db.teams;
const Company = db.companies;


/* ADD NEW MEMEBER */
exports.updateOrCreate = (req, res) => {

    Team.findOne({
        where: {
            companyId: req.body.main_company
        }
    }).then(team => {
        if (!team) {
            Team.create({
                companyId: req.body.main_company,
                members: req.body.members
            }).then(member => {
                res.status(200).json({
                    team: member,
                    success: true
                })

            }).catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })

        }
        else {
            team.update(req.body, {
                members: req.body.members
            }).then(member => {
                res.status(200).json({
                    team: member,
                    success: true
                })

            }).catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
        }
    })
}


/* GET ALL MEMBERS  */

exports.getAllMemebers = (req, res) => {
    Team.findOne({
        where: {
            companyId: req.body.company_id
        }
    }).then(members => {
        res.status(200).json(members)
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}

