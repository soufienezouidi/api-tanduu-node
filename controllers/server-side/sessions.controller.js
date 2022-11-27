var encryption = require("../../config/encryption.config")
var redirectTo = require('../../config/auth.config')
const db = require('../../models');
const User = db.user;
const AccessKeys = db.access_keys;
const Sessions = db.sessions;
const RequestIp = require('ip')
const localip = RequestIp.address();
const express = require("express");
const app = express();
const fs = require('fs')


const io = require("socket.io-client");

const socket = io("https://realtime.aroundorder.com:3200", {
    secure: true
});


var handlebars = require('handlebars');
var jwt = require("jsonwebtoken");
const crypto = require('crypto');
secretcode = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxOTk1NjUyOCwiaWF0IjoxNjE5OTU2NTI4fQ.CxZow2m2E9VuUys7nvS_bTRu8rOGaF2PSIMycpM0QUk"
var bcrypt = require("bcryptjs");
const {
    Session
} = require("inspector");

var plain = ""
const bodyParser = require("body-parser");
exports.getsessions = (req, res) => {
    try {
        socket.io.on("connection", (socket) => {
            console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")

        });
    } catch (error) {
        console.log(error.message)

    }



    var ipnumber = req.connection.remoteAddress;
    var ip = RequestIp.address(); // ip
    const ipz = req.clientIp;
    reqip = ipz.slice(ipz.lastIndexOf(":") + 1)
    var userz = null;

    if (reqip === localip) {

        console.log("attention")
    } else {
        try {
            const data = fs.readFileSync('./test.json', 'utf8')

            plain = data
        } catch (err) {
            console.error(err)
        }


        const encrypted = encryption.encrypt(plain);


        const decrypted = encryption.decrypt(encrypted);

        var table = JSON.parse(decrypted.toString())
        table.forEach(element => {


            if (element.code == req.body.code) {
                userz = element

            }
        });
    }

    if (userz !== null) {
        // res.send(user)


        var object;
        AccessKeys.findOne({
            where: {
                code: req.body.code
            },
            include: [{
                    model: db.user,
                    as: "jobber"
                },
                {
                    model: db.companies,
                    as: "company"
                }
            ]
        }).then(access_key => {
            if (access_key) {

                User.findOne({ // Find User by email
                        where: {
                            email: userz.email
                        }
                    })
                    .then(user => {
                        if (!user) {
                            res.send("user not found")
                        }

                        var passwordIsValid = bcrypt.compareSync(
                            userz.password,
                            user.password
                        );

                        if (!passwordIsValid) { // check password
                            res.send("wrong password")

                        }

                        var token = jwt.sign({ // genearte token for user
                            id: user.id
                        }, secretcode, {
                            expiresIn: 7776000 // initial token duration : 3 months
                        });
                        var authorities = [];
                        const myDate = new Date();

                        myDate.setHours(myDate.getHours() + 1);
                        var session_details = [];
                        var push_array;
                        var details;
                        var session_key = crypto.randomBytes(20).toString('hex'); // generate session key

                        // get device id
                        user.last_login = myDate;
                        user.save();
                        user.getRoles().then(roles => { // check role of user
                            for (let i = 0; i < roles.length; i++) {
                                authorities.push("ROLE_" + roles[i].name.toUpperCase());
                            }



                            var sobject = {
                                code: userz.code,
                                company: access_key.company,
                                user: access_key.jobber,
                                accessToken: token,
                                privileges: access_key.privilege,
                                session_key: userz.session_key,
                            }

                            console.log("git add ")
                            socket.emit("send-redirection-session", sobject, (socket) => {

                            });
                            console.log("git add 2 ")
                        });

                    })

                    .catch(err => {
                        res.send(err.message)
                    });
            } else {
                res.send(err.message)
            }

        }).catch(err => {
            res.send(err.message)
        })



    } else {
        res.send("not found")
    }

}