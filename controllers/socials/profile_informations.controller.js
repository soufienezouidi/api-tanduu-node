const db = require('../../models');
const ProfileInformations = db.profile_informations;

/* profile settings of user */
exports.profileInformationsUser = (req, res) => {
    ProfileInformations.findOne({
            where: {
                userId: req.body.id
            },
            include: [{
                model: db.user,
                as: "user"
            }]
        })
        .then(profile => {
            res.status(200).json(profile);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get settings of company */
exports.profileInformationsCompany = (req, res) => {
    ProfileInformations.findOne({
            where: {
                companyId: req.body.id
            },
            include: [{
                model: db.companies,
                as: "company"
            }]
        })
        .then(profile => {
            res.status(200).json(profile);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* update settings */
exports.updateInformations = (req, res) => {
    ProfileInformations.update(req.body, {
            where: {
                id: req.body.id,
            },
        }).then(profile => {
            if (!profile) {
                res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    profile: profile,
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

/* update settings */
exports.createInformations = (req, res) => {
    ProfileInformations.create(req.body).then(profile => {
            if (!profile) {
                res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            } else {
                res.status(200).json({
                    profile: profile,
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