const db = require("../../../models");
const Articles = db.articles;


/* GET ALL ARTICLES OF COMPANY */
exports.getAllArticles = (req, res) => {
    Articles.findAll({
        where: {
            userId: req.body.user_id
        },
        include: [
            {
                model: db.user
            }
        ]
    }).then(articles => {
        res.status(200).json(articles);
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
}

/* ADD NEW GROUP OF ARTICLES */
exports.addNewGroup = (req, res) => {
    Articles.findOne({
        where: {
            userId: req.body.user_id,
            group_name: req.body.group_name
        }

    }).then(group => {
        if (group) {
            res.status(200).json({
                message: "Group already exist",
                success: false
            })
        }
        else {
            Articles.create({
                userId: req.body.user_id,
                group_name: req.body.group_name,
                is_deleted: 0,
                articles: []
            }).then(new_group => {
                res.status(200).json({
                    message: "New group was created",
                    success: true
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

/* UPDATE GROUP OR ARTICLES */
exports.updateGroupOrArticle = (req, res) => {
    Articles.update(req.body, {
        where: {
            id: req.body.id,
        }
    }).then(group => {
        if (!group) {
            res.status(200).json({
                message: "Articel or group not found",
                success: false
            })
        }
        else {
            res.status(200).json({
                message: "Group or article was updated successfully",
                success: true
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: err.message,
            success: false
        })
    })
}