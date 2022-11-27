const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const requestIps = require('request-ip');
let key = 'MySuperSecretKey';
const RequestIp = require('ip')

key = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);


const encrypt = function(buffer) {
    // Create an initialization vector
    const iv = crypto.randomBytes(16);
    // Create a new cipher using the algorithm, key, and iv
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    // Create the new (encrypted) buffer
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return result;
};

const decrypt = function(encrypted) {
    // Get the iv: the first 16 bytes
    const iv = encrypted.slice(0, 16);
    // Get the rest
    encrypted = encrypted.slice(16);
    // Create a decipher
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // Actually decrypt it
    const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return result;
};



const uuiid = function(id, length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXY' + id + 'Zabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
const encryption = {
    encrypt: encrypt,
    decrypt: decrypt,
    uuiid: uuiid,
};

module.exports = encryption;