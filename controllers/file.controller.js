const uploadFile = require("../middleware/upload");
var fs = require('fs');


const upload = async(req, res) => {

    try {
        await uploadFile(req, res);


        if (req.files.file == undefined) {
            return res.status(400).send({
                message: "Please upload a file!"
            });
        }

        res.status(200).send({
            message: "Uploaded the file successfully: " + req.files.file.name,
        });
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.files.file.name}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = "./public/images/blogs/";

    fs.readdir(directoryPath, function(err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: 'Url + fibasele',
            });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const type = req.params.type;
    const fileName = req.params.name;
    const directoryPath = "./public/images/" + type + "/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};
const downloadavatar = (req, res) => {
    const type = req.params.type;
    const fileName = req.params.name;
    const directoryPath = "./public/images/user/" + type + "/";

    res.downloadavatar(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

module.exports = {
    upload,
    getListFiles,
    download,
    downloadavatar
};