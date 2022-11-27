const db = require("../models");
const config = require("../config/auth.config");
const nodemailer = require("nodemailer");
const Sequelize = require("sequelize");
const crypto = require("crypto");
var smtpTransport = require("nodemailer-smtp-transport");
var handlebars = require("handlebars");
var fs = require("fs");
const uuidv4 = require("../middleware/encryption")
const cookies = require("cookie-parser");
const path = require("path");
const machine_id = require("node-machine-id");
const RequestIp = require("@supercharge/request-ip");
var geoip = require("geoip-lite");
var ip = "207.97.227.239";
var geo = geoip.lookup(ip);
const Team = db.teams;
const Sources = db.company_sources;
const Informations = db.company_urgent_informations;
const Privileges = db.privileges;
const Product = db.products_company;
const ProfileInfo = db.profile_informations;
const ProfileSetting = db.profile_settings;
//const { Opt } = require("sequelize");
const { curly } = require("node-libcurl");
//var dateFormat = require('dateformat');
const axios = require("axios").default;
const Op = Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { Session } = require("inspector");
const e = require("cors");
let standardAlbums = ["timeline photos", "profile pictures", "cover pictures", "mobile uploads"]

/* GET MODELS */
const User = db.user;
const Role = db.role;
const ResetPassword = db.reset_password;
const Sessions = db.sessions;
const Companies = db.companies;
const Customer = db.customers;
const Contact = db.contacts;
const Albums = db.albums;
const MediaPosts = db.media_posts;

/* CONFIGURATION MAIL SERVER */
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
        user: "0c82ad1e88768e",
        pass: "3d00f12dbeeb84",
    },
});
smtpTransport = nodemailer.createTransport(
    smtpTransport({
        host: "mail.tanduu.com",
        port: 25,
        auth: {
            user: "no-reply@tanduu.com",
            pass: "gidsEnyitatAd6!./",
        },
    })
);

/*----------------------------------------*/

/* FUNCTION TO READ FILE */

var readHTMLFile = function(path, callback) {
    fs.readFile(
        path, {
            encoding: "utf-8",
        },
        function(err, html) {
            if (err) {
                throw err;
                callback(err);
            } else {
                callback(null, html);
            }
        }
    );
};

/*-------------------------------------------------- */

/*----------------------------------------*/
/* SIGN IN API */
exports.signup = (req, res) => {

    User.create({
        email: req.body.email ? req.body.email : null,
        is_active: 0, //req.body.is_active,
        is_verified: 0, // req.body.is_verified,
        password: bcrypt.hashSync(req.body.password, 8),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username ? req.body.username : null,
        phone: req.body.phone ? req.body.phone : null,
        gender: req.body.gender,
        location: {
            current: {
                country: "",
                city: "",
                visibility: "public",
                shown_to_profile: true
            },
            from: {
                country: "",
                city: "",
                visibility: "public",
                shown_to_profile: true
            },
        },
        birthday: req.body.birthday,
        position_cover: {},
        position_profile: {}
    })

    .then((user) => {
            /* send verification code */

            var code = Math.floor(100000 + Math.random() * 900000);
            const account_number =
                new Date().getFullYear() +
                "-" +
                user.id +
                "" +
                Math.floor(100 + Math.random() * 900);
            const myDate = new Date();
            myDate.setHours(myDate.getHours() + 3);
            user.code = code;
            user.expiredAt = myDate;
            user.account_number = account_number;
            user.interests = [];
            user.avatar = (Math.random() + 1).toString(36).substring(2) + "" + user.id + ".png";
            user.cover = (Math.random() + 1).toString(36).substring(2) + "" + user.id + ".png";
            user.user_link = user.first_name.replace(" ", "") + "." + user.last_name.replace(" ", "") + "." + user.id;
            user.save();
            ProfileSetting.create({
                profile: {
                    "show_profile": "public",
                    "show_who_post": "public",
                    "show_tags_post": "public",
                    "who_can_post": "public"
                },
                posts: {
                    "privacy": "public",
                    "show_comment": "public",
                    "show_likes": "public",
                    "can_comment_public": "public",
                    "can_like_public": "public"
                },
                friends_list: {
                    "show_friends": "public",
                    "show_follow": "public",
                    "show_followers": "public"
                },
                requests: {
                    "can_follow": "public",
                    "can_send_request": "public"
                },
                messages: {
                    "can_follow": "public",
                    "can_send_request": "public"
                },
                notifications: {
                    "posts": true,
                    "messages": true,
                    "comments": true
                },
                userId: user.id,
            }).then(profile => {
                ProfileInfo.create({
                    hobbies: [],
                    works: [],
                    badges: [],
                    educations: [],
                    emails: [],
                    phones: [],
                    family_relationships: [],
                    life_events: [],
                    userId: user.id,
                    socials: {
                        fb: {
                            is_shown: false,
                            link: "",
                        },
                        inst: {
                            is_shown: false,
                            link: "",
                        },
                        twt: {
                            is_shown: false,
                            link: "",
                        },
                        lnk: {
                            is_shown: false,
                            link: "",
                        },
                    },
                }).then(info => {
                    Contact.create({
                        followers: [],
                        following: [],
                        friends: [],
                        userId: user.id
                    }).then(contact => {
                        /* media */
                        MediaPosts.create({
                            filename: user.avatar,
                            file_type: 'image',
                            is_deleted: false,
                            type: 'profile picture',
                            userId: user.id,
                            link_hashed: uuidv4.uuiid(user.id, 100),
                            description: "profile picture",
                        }).then(media1 => {
                            console.log("try to addd new medi   ")
                            MediaPosts.create({
                                filename: user.avatar,
                                file_type: 'image',
                                is_deleted: false,
                                type: 'cover picture',
                                userId: user.id,
                                link_hashed: uuidv4.uuiid(user.id, 100),
                                description: "cover picture",
                            }).then(media2 => {
                                for (let i = 0; i < standardAlbums.length; i++) {
                                    Albums.create({
                                        name: standardAlbums[i],
                                        is_deleted: false,
                                        userId: user.id,
                                        is_created_by_user: false
                                    }).then(album => {

                                    }).catch(err => {
                                        res.status(500).json({
                                            message: err.message,
                                            registred: false,
                                        });
                                    });
                                }
                            }).catch(err => {
                                res.status(500).json({
                                    message: err.message,
                                    registred: false,
                                });
                            })
                        })

                        .catch(err => {
                            res.status(500).json({
                                message: err.message,
                                registred: false,
                            });
                        }).catch(err => {
                            res.status(500).json({
                                message: err.message,
                                registred: false,
                            });
                        })


                        /* end media */
                        fs.mkdir(
                            path.join("./public/users/", "user" + user.id),
                            (err) => {
                                if (err) {
                                    return console.error(err);
                                }
                                fs.mkdir(
                                    path.join("./public/users/user" + user.id, "bounces"),
                                    (err) => {
                                        if (err) {
                                            return console.error(err);
                                        }
                                        fs.mkdir(
                                            path.join("./public/users/user" + user.id + "/bounces", "comments"),
                                            (err) => {
                                                if (err) {
                                                    return console.error(err);
                                                }
                                                fs.mkdir(
                                                    path.join("./public/users/user" + user.id, "blogs"),
                                                    (err) => {
                                                        if (err) {
                                                            return console.error(err);
                                                        }
                                                        fs.mkdir(
                                                            path.join("./public/users/user" + user.id + "/bounces", "replies"),
                                                            (err) => {
                                                                if (err) {
                                                                    return console.error(err);
                                                                }
                                                                fs.mkdir(
                                                                    path.join("./public/users/user" + user.id, "profile pictures"),
                                                                    (err) => {
                                                                        if (err) {
                                                                            return console.error(err);
                                                                        }
                                                                        fs.mkdir(
                                                                            path.join("./public/users/user" + user.id + "/profile pictures", "comments"),
                                                                            (err) => {
                                                                                if (err) {
                                                                                    return console.error(err);
                                                                                }
                                                                                fs.mkdir(
                                                                                    path.join("./public/users/user" + user.id + "/profile pictures", "replies"),
                                                                                    (err) => {
                                                                                        if (err) {
                                                                                            return console.error(err);
                                                                                        }
                                                                                        fs.mkdir(
                                                                                            path.join("./public/users/user" + user.id, "cover pictures"),
                                                                                            (err) => {
                                                                                                if (err) {
                                                                                                    return console.error(err);
                                                                                                }
                                                                                                fs.mkdir(
                                                                                                    path.join("./public/users/user" + user.id + "/cover pictures", "comments"),
                                                                                                    (err) => {
                                                                                                        if (err) {
                                                                                                            return console.error(err);
                                                                                                        }
                                                                                                        fs.mkdir(
                                                                                                            path.join("./public/users/user" + user.id + "/cover pictures", "replies"),
                                                                                                            (err) => {
                                                                                                                if (err) {
                                                                                                                    return console.error(err);
                                                                                                                }
                                                                                                                fs.mkdir(
                                                                                                                    path.join("./public/users/user" + user.id, "timeline photos"),
                                                                                                                    (err) => {
                                                                                                                        if (err) {
                                                                                                                            return console.error(err);
                                                                                                                        }
                                                                                                                        fs.mkdir(
                                                                                                                            path.join("./public/users/user" + user.id + "/timeline photos", "comments"),
                                                                                                                            (err) => {
                                                                                                                                if (err) {
                                                                                                                                    return console.error(err);
                                                                                                                                }
                                                                                                                                fs.mkdir(
                                                                                                                                    path.join("./public/users/user" + user.id, "stories"),
                                                                                                                                    (err) => {
                                                                                                                                        if (err) {
                                                                                                                                            return console.error(err);
                                                                                                                                        }
                                                                                                                                        fs.mkdir(
                                                                                                                                            path.join("./public/users/user" + user.id + "/timeline photos", "replies"),
                                                                                                                                            (err) => {
                                                                                                                                                if (err) {
                                                                                                                                                    return console.error(err);
                                                                                                                                                }
                                                                                                                                                fs.mkdir(
                                                                                                                                                    path.join("./public/users/user" + user.id, "mobile uploads"),
                                                                                                                                                    (err) => {
                                                                                                                                                        if (err) {
                                                                                                                                                            return console.error(err);
                                                                                                                                                        }
                                                                                                                                                        fs.mkdir(
                                                                                                                                                            path.join("./public/users/user" + user.id + "/mobile uploads", "comments"),
                                                                                                                                                            (err) => {
                                                                                                                                                                if (err) {
                                                                                                                                                                    return console.error(err);
                                                                                                                                                                }
                                                                                                                                                                fs.mkdir(
                                                                                                                                                                    path.join("./public/users/user" + user.id, "pages"),
                                                                                                                                                                    (err) => {
                                                                                                                                                                        if (err) {
                                                                                                                                                                            return console.error(err);
                                                                                                                                                                        }
                                                                                                                                                                        fs.mkdir(
                                                                                                                                                                            path.join("./public/users/user" + user.id, "companies"),
                                                                                                                                                                            (err) => {
                                                                                                                                                                                if (err) {
                                                                                                                                                                                    return console.error(err);
                                                                                                                                                                                }
                                                                                                                                                                                fs.mkdir(
                                                                                                                                                                                    path.join("./public/users/user" + user.id, "groups"),
                                                                                                                                                                                    (err) => {
                                                                                                                                                                                        if (err) {
                                                                                                                                                                                            return console.error(err);
                                                                                                                                                                                        }
                                                                                                                                                                                        fs.mkdir(
                                                                                                                                                                                            path.join("./public/users/user" + user.id + "/mobile uploads", "replies"),
                                                                                                                                                                                            (err) => {
                                                                                                                                                                                                if (err) {
                                                                                                                                                                                                    return console.error(err);
                                                                                                                                                                                                }
                                                                                                                                                                                                const filePath =
                                                                                                                                                                                                    "./public/images/profilepic.png";
                                                                                                                                                                                                const filePathcover =
                                                                                                                                                                                                    "./public/images/company_cover.png";
                                                                                                                                                                                                const filePathCopy =
                                                                                                                                                                                                    "./public/users/user" +
                                                                                                                                                                                                    user.id +
                                                                                                                                                                                                    "/profile pictures/" + user.avatar;
                                                                                                                                                                                                const filePathCopycover =
                                                                                                                                                                                                    "./public/users/user" +
                                                                                                                                                                                                    user.id +
                                                                                                                                                                                                    "/cover pictures/" + user.cover;
                                                                                                                                                                                                fs.copyFile(filePath, filePathCopy, (err) => {
                                                                                                                                                                                                    if (err) throw err;
                                                                                                                                                                                                    console.log("File Copy Successfully.");
                                                                                                                                                                                                    fs.copyFile(filePathcover, filePathCopycover, (err) => {
                                                                                                                                                                                                        if (err) throw err;
                                                                                                                                                                                                        console.log("File Copy Successfully.");
                                                                                                                                                                                                    });
                                                                                                                                                                                                });

                                                                                                                                                                                            }

                                                                                                                                                                                        )

                                                                                                                                                                                    });

                                                                                                                                                                            });

                                                                                                                                                                    });


                                                                                                                                                            }

                                                                                                                                                        )

                                                                                                                                                    }

                                                                                                                                                )

                                                                                                                                            }
                                                                                                                                        )
                                                                                                                                    }
                                                                                                                                )

                                                                                                                            }

                                                                                                                        )

                                                                                                                    }

                                                                                                                )
                                                                                                            }

                                                                                                        )

                                                                                                    }

                                                                                                )

                                                                                            }

                                                                                        )

                                                                                    }
                                                                                )
                                                                            }
                                                                        )
                                                                    }
                                                                )
                                                            }
                                                        );
                                                    }
                                                );


                                            }
                                        );

                                    }
                                );
                            }
                        );

                    }).catch(err => {
                        res.status(500).json({
                            message: err.message,
                            registred: false,
                        });
                    })

                }).catch((err) => {
                    res.status(500).json({
                        message: err.message,
                        registred: false,
                    });
                });
            }).catch((err) => {
                res.status(500).json({
                    message: err.message,
                    registred: false,
                });
            });


            try {
                let myMobile = user.phone.includes("+") ?
                    user.phone.replace("+", "") :
                    user.phone;
                console.log(myMobile);
                let mySms = "Your security code is : " + user.code;
                let mySender = "Tanduu";
                let myDate = "18/03/2021";
                let myTime = "14:59";

                let Url_str =
                    "https://www.tunisiesms.tn/client/Api/Api.aspx?fct=sms&key=rI/-/kBSas5kYa/-/hRHxcBv/2/-/f9pNveQoKzkVmmQk8u/ZqcL4QtjuA3YwstOeS/1zYvbA2krhX/F94cWxgWVXGgg==&mobile=" +
                    myMobile +
                    "&sms=" +
                    mySms +
                    "&sender=Tanduu&date=18/03/2022&heure=20:20:20";

                Url_str = Url_str.replace("216XXXXXXXX", myMobile);
                Url_str = Url_str.replace("Hello+World", mySms);
                Url_str = Url_str.replace("YYYYYYY", mySender);
                Url_str = Url_str.replace("jj/mm/aaaa", myDate);
                Url_str = Url_str.replace("hh:mm:ss", myTime);

                let myURL = new URL(Url_str);
                const { statusCode, data, headers } = curly.get(Url_str);
                try {
                    return axios.get(Url_str).then((rs) => {
                        //  send verification code
                        readHTMLFile(
                            "./templates/register_mail.html",
                            function(err, html) {
                                var template = handlebars.compile(html);
                                var replacements = {
                                    fullname: user.first_name + " " + user.last_name,
                                    code: user.code,
                                    expiredAt: user.expiredAt,
                                };
                                var htmlToSend = template(replacements);
                                var mailOptions = {
                                    from: "Tanduu team <no-reply@tanduu.com>",
                                    to: user.email,
                                    subject: "Activate your account",
                                    html: htmlToSend,
                                };
                                smtpTransport.sendMail(
                                    mailOptions,
                                    function(error, response) {
                                        if (error) {
                                            // callback(error);
                                        }
                                    }
                                );
                            }
                        );
                        res.status(200).json({
                            message: "New user was added successfully",
                            registred: true,
                        });
                    });
                } catch (error) {
                    console.error(error);
                }
                let myURLConnection = myURL.openConnection();
                myURLConnection.connect();
            } catch (e) {
                console.log(e.message);
            }

            res.status(200).json({
                message: "New user was added successfully",
                registred: true,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
                registred: false,
            });
        });
};

/* ----------------------------------------------*/
/* SIGN IN API */

exports.signin = (req, res) => {
    User.findOne({
            // Find User by email
            where: {
                [Op.or]: [{ email: req.body.login }, { username: req.body.login }],
            },
        })
        .then((user) => {
            if (!user) {
                res.status(200).json({
                    loggingin: false,
                    message: "User Not found.",
                });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                // check password
                res.status(200).json({
                    loggingin: false,
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }

            var token = jwt.sign({
                    // genearte token for user
                    id: user.id,
                },
                config.secret, {
                    expiresIn: 7776000, // initial token duration : 3 months
                }
            );
            var authorities = [];
            const myDate = new Date();

            myDate.setHours(myDate.getHours() + 1);
            var session_key = crypto.randomBytes(20).toString("hex"); // generate session key
            user.session_key = session_key;
            user.device_id = machine_id.machineIdSync({
                original: true,
            }); // get device id
            user.last_login = myDate;
            user.save();
            let userConnected = {
                    id: user.id,
                    email: user.email,
                    // roles: authorities,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    is_verified: user.is_active,
                    last_login: user.last_login,
                    verificationToken: user.code,
                    expiredAt: user.expiredAt,
                    is_active: user.is_active,
                    session_key: user.session_key,
                    device_id: user.device_id,
                    location: user.location,
                    phone: user.phone,
                    username: user.username,
                    byphone: user.email ? false : true,
                    avatar: user.avatar
                }
                /*  res.cookie("uid", token, {
                      secure: true,
                      httpOnly: true,
                      // expires: day().add(30, "days").toDate(),
                  });*/
            res.status(200).json({
                loggingin: true,
                id: user.id,
                email: user.email,
                roles: authorities,
                first_name: user.first_name,
                last_name: user.last_name,
                is_verified: user.is_active,
                last_login: user.last_login,
                accessToken: token,
                verificationToken: user.code,
                expiredAt: user.expiredAt,
                is_active: user.is_active,
                session_key: user.session_key,
                device_id: user.device_id,
                location: user.location,
                phone: user.phone,
                username: user.unsername,
                byphone: user.email ? false : true,
                avatar: user.avatar
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
            });
        });
};

/*---------------------------------------*/
/* CONFIRM ACCOUNT API */

exports.confirmCode = (req, res) => {
    User.findOne({
        where: {
            id: req.body.id,
        },
    }).then((user) => {
        if (!user) {
            res.status(200).json({
                activated: false,
                message: "User Not found.",
            });
        }
        if (user && user.is_active == 1) {
            res.status(200).json({
                activated: true,
                message: "Your account was already confirmed",
            });
        }
        if (user && user.is_active == 0) {
            var d1 = new Date();
            var d2 = new Date(user.expiredAt);

            if (d1 > d2) {
                res.status(200).json({
                    activated: false,
                    message: "Token was expired",
                });
            } else if (req.body.code != user.code) {
                res.status(200).json({
                    activated: false,
                    message: "You entred a wron code. Please verify you email and try again",
                });
            } else {
                user.is_active = 1;
                user.save();

                res.status(200).json({
                    activated: true,
                    message: "Your account was confirmed successfully",
                });
            }
        }
    });
};

/*------------------------------------------*/
/* FORGET PASSWORD API*/
exports.forgetPassword = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((user) => {
        if (!user) {
            return res.status(200).json({
                reset: false,
                message: "User Not found.",
            });
        } else {
            var token = crypto.randomBytes(20).toString("hex"); // genearte token
            var code = Math.floor(100000 + Math.random() * 900000);
            const myDate = new Date();
            myDate.setHours(myDate.getHours() + 3);
            ResetPassword.create({
                email: req.body.email,
                expiration: myDate,
                token: code,
                used: 0,
            });
            try {
                let myMobile = user.phone.includes("+") ?
                    user.phone.replace("+", "") :
                    user.phone;
                console.log(myMobile);
                let mySms = "Your security code is : " + code;
                let mySender = "Tanduu";
                let myDate = "18/03/2021";
                let myTime = "14:59";

                let Url_str =
                    "https://www.tunisiesms.tn/client/Api/Api.aspx?fct=sms&key=rI/-/kBSas5kYa/-/hRHxcBv/2/-/f9pNveQoKzkVmmQk8u/ZqcL4QtjuA3YwstOeS/1zYvbA2krhX/F94cWxgWVXGgg==&mobile=" +
                    myMobile +
                    "&sms=" +
                    mySms +
                    "&sender=Tanduu&date=18/03/2022&heure=20:20:20";

                Url_str = Url_str.replace("216XXXXXXXX", myMobile);
                Url_str = Url_str.replace("Hello+World", mySms);
                Url_str = Url_str.replace("YYYYYYY", mySender);
                Url_str = Url_str.replace("jj/mm/aaaa", myDate);
                Url_str = Url_str.replace("hh:mm:ss", myTime);

                let myURL = new URL(Url_str);
                const { statusCode, data, headers } = curly.get(Url_str);
                try {
                    return axios.get(Url_str).then((response) => {
                        return res.status(200).json({
                            reset: true,
                            message: "Link was sent successfully.",
                        });
                    });
                } catch (error) {
                    console.error(error);
                }
                let myURLConnection = myURL.openConnection();
                myURLConnection.connect();
            } catch (e) {
                console.log(e.message);
            }
            readHTMLFile("./templates/reset_password.html", function(err, html) {
                var template = handlebars.compile(html);
                var replacements = {
                    fullname: user.first_name + " " + user.last_name,
                    code: code
                };
                var htmlToSend = template(replacements);
                var mailOptions = {
                    from: "Tanduu team <no-reply@tanduu.com>",
                    to: user.email,
                    subject: "Reset Password",
                    html: htmlToSend,
                };
                smtpTransport.sendMail(mailOptions, function(error, response) {
                    if (error) {
                        callback(error);
                    }
                });
            });
        }

    });
};

/*------------------------------------------*/
/* CHECK PASSWORD CONFIRMATION LINK API */

exports.showFormResetPassword = (req, res, next) => {
    ResetPassword.findOne({
        // Find User by email
        where: {
            email: req.body.email,
            token: req.body.code,
        },
    }).then((record) => {
        if (!record) {
            res.status(200).json({
                change: false,
                message: "This link is expired. Please try again",
            });
        } else {
            var d1 = new Date();
            var d2 = new Date(record.expiration);
            if (d1 > d2 || record.used == true) {
                res.status(200).json({
                    change: false,
                    message: "This link is expired",
                });
            } else {
                {
                    res.status(200).json({
                        change: true,
                        message: "You can now change your password",
                    });
                }
            }
        }
    });
};

/*------------------------------------------*/
/* RESET PASSWORD AP*/

exports.resetPassword = (req, res, next) => {
    ResetPassword.findOne({
        where: {
            email: req.body.email,
            token: req.body.token,
        },
    }).then((record) => {
        if (!record) {} else {
            User.findOne({
                // Find User by email
                where: {
                    email: req.body.email,
                },
            }).then((user) => {
                if (!user) {
                    res.status(200).json({
                        reset: false,
                        message: "User Not found.",
                    });
                }
                var newPassword = bcrypt.hashSync(req.body.new_password, 8); // Crypt new password
                user.password = newPassword;
                user.save();
                record.used = 1;
                record.save();
                res.status(200).json({
                    reset: true,
                    message: "Password reset. Please login with your new password.",
                });
            });
        }
    });
};

/*------------------------------------------*/
/* UPDATE PASSWORD */

exports.updatePassword = (req, res, next) => {
    User.findOne({
            where: {
                id: req.body.id,
            },
        })
        .then((user) => {
            if (user) {
                var passwordIsValid = bcrypt.compareSync(
                    req.body.old_password,
                    user.password
                );
                if (passwordIsValid) {
                    user
                        .update({
                            password: bcrypt.hashSync(req.body.new_password, 8),
                        })
                        .then((password_updated) => {
                            res.status(200).json({
                                reset: true,
                                message: "password has been set successfully",
                            });
                        })
                        .catch((err) => {
                            res.status(500).json({
                                message: err.message,
                            });
                        });
                } else {
                    res.status(200).json({
                        reset: false,
                        message: "Old password is wrong. please try again",
                    });
                }
            } else {
                res.status(200).json({
                    reset: false,
                    message: "User not found",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message,
            });
        });
};

/*-------------------------------------------------*/
/* RESEND CONFIRMATION LINK API */
exports.resetCode = (req, res) => {
    var user = User.findOne({
        where: {
            id: req.body.id,
        },
    }).then((user) => {
        if (user == null) {
            res.status(200).json({
                reset: false,
                message: "User not found",
            });
        } else {
            var code = Math.floor(100000 + Math.random() * 900000);
            const myDate = new Date();
            myDate.setHours(myDate.getHours() + 2);
            user.code = code;
            user.expiredAt = myDate;
            user.save();
            if (req.body.byphone) {
                try {
                    let myMobile = user.phone.includes("+") ?
                        user.phone.replace("+", "") :
                        user.phone;
                    console.log(myMobile);
                    let mySms = "Your security code is : " + user.code;
                    let mySender = "Tanduu";
                    let myDate = "18/03/2021";
                    let myTime = "14:59";

                    let Url_str =
                        "https://www.tunisiesms.tn/client/Api/Api.aspx?fct=sms&key=rI/-/kBSas5kYa/-/hRHxcBv/2/-/f9pNveQoKzkVmmQk8u/ZqcL4QtjuA3YwstOeS/1zYvbA2krhX/F94cWxgWVXGgg==&mobile=" +
                        myMobile +
                        "&sms=" +
                        mySms +
                        "&sender=Tanduu&date=18/03/2022&heure=20:20:20";

                    Url_str = Url_str.replace("216XXXXXXXX", myMobile);
                    Url_str = Url_str.replace("Hello+World", mySms);
                    Url_str = Url_str.replace("YYYYYYY", mySender);
                    Url_str = Url_str.replace("jj/mm/aaaa", myDate);
                    Url_str = Url_str.replace("hh:mm:ss", myTime);

                    let myURL = new URL(Url_str);
                    const { statusCode, data, headers } = curly.get(Url_str);
                    try {
                        axios.get(Url_str);
                        res.status(200).json({
                            reset: true,
                            message: "We already sent you confirmation link.",
                        });
                    } catch (error) {
                        console.error(error);
                    }
                    let myURLConnection = myURL.openConnection();
                    myURLConnection.connect();
                } catch (e) {}
            } else {
                readHTMLFile("./templates/register_mail.html", function(err, html) {
                    var template = handlebars.compile(html);
                    var replacements = {
                        fullname: user.first_name + " " + user.last_name,
                        code: user.code,
                        expiredAt: user.expiredAt, //dateFormat(user.expiredAt, "dd-mm-yyyy h:MM")
                    };
                    var htmlToSend = template(replacements);
                    var mailOptions = {
                        to: user.email,
                        from: "Tanduu team <no-reply@tanduu.com>",
                        subject: "Acivate your account",
                        html: htmlToSend,
                    };
                    smtpTransport.sendMail(mailOptions, function(error, response) {
                        if (error) {
                            //   callback(error);
                        }
                        res.status(200).json({
                            reset: true,
                            message: "We already sent you confirmation link.",
                        });
                    });
                });
            }

            res.status(200).json({
                reset: true,
                message: "We already sent you confirmation link.",
            });
        }
    });
};

/*--------------------------------------*/
/* LOGOUT API*/
exports.logout = async(req, res, next) => {
    Sessions.findOne({
            where: {
                userId: req.body.userId,
            },
        })
        .then((session) => {
            if (session) {
                var arr = session.session_details;
                //Find index of specific object using findIndex method.
                var objIndex = arr.findIndex(
                    (obj) => obj.session_key === req.body.session
                );
                arr[objIndex].end_session = new Date();

                let obj = {
                    session_details: arr,
                };

                //Update object's name property.
                Sessions.update(obj, {
                    where: {
                        userId: req.body.userId,
                    },
                }).then((s) => {
                    return res.status(200).json({
                        message: "Your session was expired",
                        success: true,
                    });
                });
            } else {
                return res.status(200).json({
                    message: "user not found",
                    success: false,
                });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message,
                success: false,
            });
        });
};