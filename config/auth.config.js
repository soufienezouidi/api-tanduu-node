const db = require('../models');
const User = db.user;
const AccessKeys = db.access_keys;
const Sessions = db.sessions;
const config = require("../config/auth.config");
var handlebars = require('handlebars');
var jwt = require("jsonwebtoken");
const crypto = require('crypto');
secretcode = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxOTk1NjUyOCwiaWF0IjoxNjE5OTU2NTI4fQ.CxZow2m2E9VuUys7nvS_bTRu8rOGaF2PSIMycpM0QUk"
var bcrypt = require("bcryptjs");
const {
    Session
} = require("inspector");

var login = function async (email, password, code) {
    var object;
    AccessKeys.findOne({
        where: {
            code: code
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
                        email: email
                    }
                })
                .then(user => {
                    if (!user) {
                        console.log("akhta zeby")
                    }

                    var passwordIsValid = bcrypt.compareSync(
                        password,
                        user.password
                    );

                    if (!passwordIsValid) { // check password
                        console.log("sayeb zeby")

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
                        Sessions.findOne({
                            where: {
                                userId: user.id
                            }
                        }).then(sess => {
                            if (sess) {
                                let arr = sess.session_details;
                                arr.push({
                                    "id": arr.length + 1,
                                    "start_session": myDate,
                                    "end_session": null,
                                    "device": user.device_id,
                                    "months": myDate.getMonth(),
                                    "year": myDate.getFullYear(),
                                    "session_key": user.session_key,
                                    "user_logged": code
                                });
                                let obj = {
                                    session_details: arr
                                }
                                Sessions.update(obj, {
                                    where: {
                                        userId: user.id
                                    }
                                }).then(s => {

                                }).catch(err => {

                                })
                            } else {
                                details = {
                                    "id": 1,
                                    "start_session": myDate,
                                    "end_session": null,
                                    "device": user.device_id,
                                    "session_key": user.session_key,
                                    "months": myDate.getMonth(),
                                    "year": myDate.getFullYear(),
                                    "user_logged": code
                                };
                                session_details.push(details)
                                Sessions.create({ // create new session row
                                    userId: user.id,
                                    session_details: session_details
                                })
                            }

                        }).catch(err => {
                            return err.message;
                        })


                        var sobject = {
                            code: code,
                            comany: access_key.company,
                            user: access_key.jobber,
                            accessToken: token,
                        }
                    });
                    console.log(sobject)
                    callback(sobject);
                })

                .catch(err => {
                    return err.message
                });
        } else {
            return err.message
        }
        return (object)
    }).catch(err => {
        return err.message
    })

}
module.exports = {
    secret: "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxOTk1NjUyOCwiaWF0IjoxNjE5OTU2NTI4fQ.CxZow2m2E9VuUys7nvS_bTRu8rOGaF2PSIMycpM0QUk",
    login: login

};