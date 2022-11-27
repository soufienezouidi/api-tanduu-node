const db = require('../../models');
const fs = require('fs')
    /* load file for comments */
exports.loadFileComment = (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const fileName = req.params.fileName;
    let file = fs.readFileSync(
        "./public/users/user" + userId + "/" + postId + "/comments/" + fileName
    );
    res.status(200).send(file);
}

/* load file for comments replies */
exports.loadFileCommentReply = (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;
    const fileName = req.params.fileName;
    let file = fs.readFileSync(
        "./public/users/user" + userId + "/" + postId + "/replies/" + fileName
    );
    res.status(200).send(file);
}