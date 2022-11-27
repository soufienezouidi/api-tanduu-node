const multer = require("multer");

exports.uploadFilesForPosts = (req, res) => {
    const forum_storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "./public/users/user1/posts/1");
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname);
        },
    });
    const upload_forum = multer({
        storage: forum_storage,
    });
    upload_forum.array("file", 1),
        function(req, res) {
            res.end();
        }
}