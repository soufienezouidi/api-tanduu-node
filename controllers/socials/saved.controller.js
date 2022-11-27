const db = require("../../models")
const SavedItem = db.saved_items;
const SavedCollection = db.saved_collections;

/* get saved collections of user with items */
exports.getSavedCollectionsOfUser = (req, res) => {
    SavedCollection.findAll({
            where: {
                userId: req.body.id
            },
            include: [{
                    model: db.user,
                },
                {
                    model: db.companies,
                },
                {
                    model: db.saved_items,
                    include:[{
                        model: db.posts
                    },
                        {model: db.user}],
                    where: { is_deleted: 0 }
                }
            ]
        })
        .then(collections => {
            res.status(200).json(collections);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* get saved collections of user without items */
exports.getSavedCollectionsOfUserItems = (req, res) => {
    SavedCollection.findAll({
        where: {
            userId: req.body.id,
            is_deleted: 0
        }

    })
        .then(collections => {
            res.status(200).json(collections);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* update collection */
exports.updateCollection = (req, res) => {
    SavedCollection.update(req.body, {
            where: { id: req.body.id }
        }).then(collections => {
            if (!collections) {
                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: collections,
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

/* create collection */
exports.createCollection = (req, res) => {
    SavedCollection.create(req.body, {
            where: { id: req.body.id }
        }).then(collections => {
            if (!collections) {
                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: collections,
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


/* get saved collections of user */
exports.getSavedItemsOfUser = (req, res) => {
    SavedItem.findAll({
            where: {
                userId: req.body.id,
                is_deleted: 0
            },
            include: [{
                    model: db.user,
                },
                {
                    model: db.saved_collections,
                },
                {
                    model: db.companies,
                },
                {
                    model: db.posts,
                    include: [{
                        model: db.user,
                        as: "user"
                    }]
                }
            ]
        })
        .then(collections => {
            res.status(200).json(collections);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
};

/* update saved item */
exports.updateSavedItem = (req, res) => {
    SavedItem.update(req.body, {
            where: { id: req.body.id }
        }).then(collections => {
            if (!collections) {
                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: collections,
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

/* get saved item by object */
exports.getItemByPostAndUser = (req, res) => {
    SavedItem.findOne({
            where: {
                userId: req.body.userId,
                postId: req.body.postId,
                is_deleted: 0
            },
        include: [
            {model: db.saved_collections}
        ]
        }).then(collections => {

            res.status(200).json({
                data: collections,
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

/* get saved item by collection */
exports.getItemsOfCollections = (req, res) => {
    SavedItem.findAll({
        where: {
            savedCollectionId: req.body.id,
            userId: req.body.userId,
            is_deleted: 0
        },
        include : [
            {
                model: db.saved_collections
            },
            {
                model: db.posts,
                as: 'post',
                include: [{
                    model: db.user,
                    as: "user",
                },
                    {
                        model: db.albums
                    }
                ]
            }
        ]
    }).then(collections => {
        res.status(200).json(collections);
    })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            });
        });
}

/* create saved item */
exports.createSavedItems = (req, res) => {
    SavedItem.create(req.body, {
            where: { id: req.body.id }
        }).then(collections => {
            if (!collections) {
                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: collections,
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