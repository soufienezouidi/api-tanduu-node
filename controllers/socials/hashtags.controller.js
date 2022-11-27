const db = require("../../models")
const Hashtag = db.post_hashtags;

/* create hashtags of posts */
exports.createHashtag = (req, res) => {
    let hashtagsList = req.body.hashtags;
    console.log(hashtagsList)
    if (hashtagsList.length > 0) {
        for (let index = 0; index < hashtagsList.length; index++) {
            const element = hashtagsList[index];
            Hashtag.findOne({
                where: {
                    hashtag: element
                }
            }).then(data => {
                if (!data) {
                    Hashtag.create({
                        hashtag: element,
                        posts: [req.body.postId],
                        count: 1
                    }).then(created => {
                        res.status(200).json({
                            created: created,
                            success: true,
                        });
                    }).catch((err) => {
                        res.status(500).json({
                            message: err.message,
                            success: false,
                        });
                    });
                } else {
                    let arrayNewHashtags = [];
                    arrayNewHashtags = JSON.parse(data.posts);
                    let found = JSON.parse(data.posts).some((post) => post === req.body.postId);
                    if (!found) {
                        arrayNewHashtags.push(req.body.postId);
                        data.posts = arrayNewHashtags
                            //data.posts = JSON.parse(data.posts).push(req.body.postId);
                        data.count = arrayNewHashtags.length;
                        data.save();
                        res.status(200).json({
                            message: data,
                            success: true,
                        });

                    }
                }
            })

        }
    }
    /*Hashtag.create(req.body).then(hashtag => {
            if (!hashtag) {
                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: hashtag,
                    success: true,
                });
            }

        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                success: false,
            });
        });*/
}

/* create hashtags of posts */
exports.editHashtag = (req, res) => {
    Hashtag.update(req.body, {
            where: { id: req.body.id }
        }).then(hashtag => {
            if (!hashtag) {
                res.status(200).json({
                    message: "something wrong happened",
                    success: false,
                });
            } else {
                res.status(200).json({
                    data: hashtag,
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