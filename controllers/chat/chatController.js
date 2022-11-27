const fs = require('fs');
const path = require('path');

/*let rawdata = fs.readFileSync(path.resolve(__dirname, 'student.json'));
let student = JSON.parse(rawdata);
console.log(student); */
exports.getConversationPath = (req, res) => {
    const type = req.params.type;
    const fileName = req.params.name;
    let conversation = fs.readFileSync('./public/conversations/' + type + '/' + fileName)
    const chatFile = JSON.parse(conversation);
    res.status(200).send(chatFile);

}