const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const session = require("express-session");
const path = require("path")
var md5 = require("md5");
var rimraf = require("rimraf");
var fs = require("fs");
var https = require("https");
const upload = multer({
    dest: "ressources/post",
}).single("demo_image");
const controller = require("./controllers/file.controller");
const app = express();
// Add headers before the routes are defined

var corsOptions = {
    origin: "*",
};
global.__basedir = __dirname;
app.use(
    cors({
        credentials: true,
        origin: "*",
    })
);
const DIR = "./avatars";
const Dir2 = "./cabinets";

const { checkUpload, authJwt } = require("./middleware");

const morgan = require("morgan");
const _ = require("lodash");
/* session change */
const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const requestIps = require("request-ip");
let key = "MySuperSecretKey";
const RequestIp = require("ip");

key = crypto
    .createHash("sha256")
    .update(String(key))
    .digest("base64")
    .substr(0, 32);
app.use(requestIps.mw());

/* session change */

const db = require("./models");
const Role = db.role;
const Currencies = db.currencies;
db.sequelize.sync();
/*db.sequelize.sync({
    force: true,
}).then(() => {
    initial();
    // InsertCurrenciesData();
});
*/
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// parse requests of content-type - application/json
/*app.use(
    bodyParser.urlencoded({
        limit: "850mb",
        extended: true,
        parameterLimit: 100000,
    })
);
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
/*app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(
    bodyParser.json({
        limit: "850mb",
    })
);
app.use(
    bodyParser.urlencoded({
        limit: "850mb",
        extended: true,
        parameterLimit: 50000,
    })
);
app.use(
    express.json({
        limit: "850mb",
    })
);
app.use(
    express.urlencoded({
        limit: "850mb",
    })
);*/
//app.use(bodyParser.json({ limit: '1000mb', extended: true }))
//app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }))
app.use("./public/images/blogs", express.static("blogs"));
app.use("./public/conversations", express.static("conversations"));
app.use("./public/images/categories", express.static("categories"));
app.use("./public/images/quick_services", express.static("quick_services"));
app.use("./public/images/banners", express.static("banners"));
app.use("./public/images/sub_categories", express.static("sub_categories"));
app.use("./public/images/user", express.static("user"));
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(morgan("dev"));

var io = require("socket.io")(https);



// routes
app.get("/", (req, res) => {
    res.json({
        message: "WELCOME TO TANDUU SERVER BACKEND",
    });
});

// blog upload photo
const forum_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/images/blogs/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload_forum = multer({
    storage: forum_storage,
});
app.post(
    "/api/tanduu_admin/blogs/uploadphoto", [authJwt.verifyToken, authJwt.isTanduu],
    upload_forum.array("file", 1),
    function(req, res) {
        res.end();
    }
);

// categories upload photo

const categories_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/images/categories");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload_categories = multer({
    storage: categories_storage,
});
app.post(
    "/api/tanduu_admin/categories/upload_picture", [authJwt.verifyToken, authJwt.isTanduu],
    upload_categories.array("file", 1),
    function(req, res) {
        res.end();
    }
);

// subcategories upload photo

const subcategories_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/images/sub_categories");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload_subcategories = multer({
    storage: subcategories_storage,
});
app.post(
    "/api/tanduu_admin/sub-categories/upload_picture", [authJwt.verifyToken, authJwt.isTanduu],
    upload_subcategories.array("file", 1),
    function(req, res) {
        res.end();
    }
);

// quick-services upload photo

const banners_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/images/banners");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload_banners = multer({
    storage: banners_storage,
});
app.post(
    "/api/tanduu_admin/categories/uploadbanner",
    /*[authJwt.verifyToken, authJwt.isTanduu],*/
    upload_banners.array("file", 1),
    function(req, res) {
        res.end();
    }
);

// quick-services upload photo

const quick_services_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/images/quick_services");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload_quick_services = multer({
    storage: quick_services_storage,
});
app.post(
    "/api/tanduu_admin/quick_services/upload_picture", [authJwt.verifyToken, authJwt.isTanduu],
    upload_quick_services.array("file", 1),
    function(req, res) {
        res.end();
    }
);

const user_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(typeof file.filename);
        console.log();
        var userIdFolder = file.originalname.split("-")[0];
        cb(null, "./public/users/user" + userIdFolder + "/profile pictures");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split("-")[1]);
    },
});
const upload_userfile = multer({
    storage: user_storage,
});

/* cover */
const user_cover_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(typeof file.filename);
        console.log();
        var userIdFolder = file.originalname.split("-")[0];
        cb(null, "./public/users/user" + userIdFolder + "/cover pictures");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split("-")[1]);
    },
});
const upload_userCover = multer({
    storage: user_cover_storage,
});
app.post(
    "/api/user/upload_file",
    upload_userfile.array("file", 1),
    function(req, res) {
        res.end();
    }
);

app.post(
    "/api/user/upload_file/cover",
    upload_userCover.array("file", 1),
    function(req, res) {
        res.end();
    }
);

// chat upload file

const chatfiles_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(typeof file.filename);
        var txt1 = file.originalname.split("-")[0];
        var txt2 = file.originalname.split("-")[1];
        cb(null, "./public/conversations/" + txt1);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split("-")[1]);
    },
});
const upload_chatfiles = multer({
    storage: chatfiles_storage,
});
app.post(
    "/api/chat/upload_file",
    upload_chatfiles.array("file", 1),
    function(req, res) {
        res.end();
    }
);

//const ffprobe = require('ffprobe')
/* Shop and galerie*/

const products_picture = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(typeof file.filename);
        console.log(req.body);
        var txt1 = file.originalname.split("-")[0];
        var txt2 = file.originalname.split("-")[1];
        cb(null, "./public/images/user/" + txt1 + "/" + txt2 + "/products");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split("-")[2]);
    },
});
const upload_product_picture = multer({
    storage: products_picture,
});
app.post(
    "/api/user/product/upload" /*[authJwt.verifyToken, authJwt.isTanduu]*/ ,
    upload_product_picture.array("file", 1),
    function(req, res) {
        res.end();
    }
);

const storageGallery = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file);
        const galleryId = file.originalname.split("-")[0];
        cb(null, "./public/images/user/" + galleryId + "/" + file.originalname.split("-")[1] + "/galleries");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split("-")[2]);
    },
});
var uploadFilesMultiple = multer({
    storage: storageGallery,
});

app.post(
    "/api/user/upload/galleries",
    uploadFilesMultiple.array("files"),
    function(req, res, next) {
        const files = req.files;
        if (Array.isArray(files) && files.length > 0) {
            res.json(req.files);
        } else {
            res.status(400);
            throw new Error("No file");
        }
    }
);

/* ====================================================
 * UPLOAD FILES FOR POST AND COMMENTS
/* ==================================================== */
/* upload files for posts */
const storagePosts = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file);
        const postId = file.originalname.split("-")[1];
        const userId = file.originalname.split("-")[0];
        cb(null, "./public/users/" + userId + "/" + postId);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split("-")[2]);
    },
});
const uploadFilesPosts = multer({
    storage: storagePosts,
});

app.post(
    "/api/posts/upload/files",
    uploadFilesPosts.array("files"),
    function(req, res, next) {
        const files = req.files;
        if (Array.isArray(files) && files.length > 0) {
            res.json(req.files);
        } else {
            res.status(400);
            throw new Error("No file");
        }
    }
);

const storageProd = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(file);

        cb(null, "./public/images/products");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const uploadFilesPod = multer({
    storage: storageProd,
});

app.post(
    "/api/marketplace/upload",
    uploadFilesPod.array("files"),
    function(req, res, next) {
        const files = req.files;
        if (Array.isArray(files) && files.length > 0) {
            res.json(req.files);
        } else {
            res.status(400);
            throw new Error("No file");
        }
    }
);


/* upload file for comments and replies */
const commentPics = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(typeof file.filename);
        console.log(req.body);
        var userId = file.originalname.split("-")[0];
        var postId = file.originalname.split("-")[1];
        var type = file.originalname.split("-")[2];
        cb(null, type == 'comments' ? "./public/users/" + userId + "/" + postId + "/comments" : "./public/users/" + userId + "/" + postId + "/replies");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split("-")[3]);
    },
});
const commentStorages = multer({
    storage: commentPics,
});
app.post(
    "/api/post/comment/upload" /*[authJwt.verifyToken, authJwt.isTanduu]*/ ,
    commentStorages.array("file", 1),
    function(req, res) {
        res.status(200).json({
            message: "upload successfully",
            success: true,
        });
    }
);

/* upload file for stories */
const storiesFiles = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(typeof file.filename);
        console.log(req.body);
        var userId = file.originalname.split("-")[0];
        cb(null, "./public/users/" + userId + "/stories");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split("-")[1]);
    },
});
const StoriesStorage = multer({
    storage: storiesFiles,
});
app.post(
    "/api/stories/upload" /*[authJwt.verifyToken, authJwt.isTanduu]*/ ,
    StoriesStorage.array("file", 1),
    function(req, res) {
        res.status(200).json({
            message: "upload successfully",
            success: true,
        });
    }
);
/* upload file for bounces */
const bouncesFiles = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(typeof file.filename);
        console.log(req.body);
        var userId = file.originalname.split("-")[0];
        cb(null, "./public/users/" + userId + "/bounces");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split("-")[1]);
    },
});
const bouncesStorage = multer({
    storage: bouncesFiles,
});

app.post(
    "/api/bounces/upload" /*[authJwt.verifyToken, authJwt.isTanduu]*/ ,
    bouncesStorage.array("file", 1),
    function(req, res) {
        /* ffmpeg(req.files[0].path)
             .setFfmpegPath(ffmpeg_static)
             .screenshots({
                 timestamps: [0.0],
                 filename: 'xx.png',
                 folder: "./public/users/" + req.files[0].originalname.split("-")[0] + "/bounces"
             }).on('end', function() {
                 console.log('done');
             });*/
        /*ffmpeg(req.files[0].path)
            .takeScreenshots({
                count: 1,
                timemarks: ['10'] // number of seconds
            }, "./public/users/" + req.files[0].originalname.split("-")[0] + "/bounces", function(err) {
                console.log('screenshots were saved')
            });*/
        /* ffmpeg("./public/users/" + req.files[0].originalname.split("-")[0] + "/bounces/bounce_1665747499868.mp4")
             .on('filenames', function(filenames) {
                 console.log('Will generate ' + filenames.join(', '))
             })
             .on('end', function() {
                 console.log('Screenshots taken');
             })
             .screenshots({
                 // Will take screens at 20%, 40%, 60% and 80% of the video
                 count: 4,
                 folder: "./public/users/" + req.files[0].originalname.split("-")[0]
             });*/
        res.status(200).json({
            message: "upload successfully",
            success: true,
        });
    }
);

/* upload file for blog user */
// blog upload photo
const bloguser = multer.diskStorage({
    destination: function(req, file, cb) {
        var userId = file.originalname.split("-")[0];
        var filename = file.originalname.split("-")[1];
        cb(null, "./public/images/blogs");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split("-")[1]);
    },
});
const upload_blog = multer({
    storage: bloguser,
});
app.post(
    "/api/user/blogs/uploadphoto",
    upload_blog.array("file", 1),
    function(req, res) {
        res.status(200).json({ success: true });
    }
);

/* upload page pic */
const pagePic = multer.diskStorage({
    destination: function(req, file, cb) {
        var userId = file.originalname.split("-")[0];
        var page = file.originalname.split("-")[1];
        var type = file.originalname.split("-")[2];
        var filename = file.originalname.split("-")[3];
        cb(null, type === "profile" ? "./public/users/" + userId + "/pages/pages_" + page + "/profile pictures" : "./public/users/" + userId + "/pages/pages_" + page + "/cover pictures");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split("-")[3]);
    },
});
const upload_pic = multer({
    storage: pagePic,
});
app.post(
    "/api/user/page/uploadphoto",
    upload_pic.array("file", 1),
    function(req, res) {
        res.status(200).json({ success: true });
    }
);


/*
const upload_galleries_picture = multer({
    storage: gallery_picture
})
app.post("/api/user/galleries/upload" /*[authJwt.verifyToken, authJwt.isTanduu], upload_galleries_picture.array('file', 10), function (req, res) {
    res.end();
});
*/

//session
app.use(requestIps.mw());
const ipMiddleware = function(req, res, next) {
    const clientIp = requestIps.getClientIp(req);
    next();
};

// simple route
require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/tanduu_admin_routes/categories.route")(app);
require("./routes/customers_routes/customers.route")(app);
require("./routes/tanduu_admin_routes/translation.route")(app);
require("./routes/tanduu_admin_routes/branches.route")(app);
require("./routes/tanduu_admin_routes/mail.route")(app);
require("./routes/tanduu_admin_routes/blog.route")(app);
require("./routes/admin/orders/sent_orders.route")(app);
require("./routes/admin/orders/received_orders.route")(app);
require("./routes/file.route")(app);
require("./routes/admin/account/account.route")(app);
require("./routes/admin/teamsManagement/teams.route")(app);
require("./routes/admin/orders/urgent_informations.route")(app);
require("./routes/commercial/commercial.route")(app);
require("./routes/super_admin/commercials.route")(app);
require("./routes/admin/companies.route")(app);
require("./routes/admin/orders/sources.route")(app);
require("./routes/customers_routes/blogs.route")(app);
require("./routes/customers_routes/blog_comment.route")(app);
require("./routes/tanduu_admin_routes/express_services.route")(app);
require("./routes/notifcations_routes/notification.route")(app);
require("./routes/chat.route")(app);
require("./routes/chat_company.route")(app);
require("./routes/admin/teamsManagement/invitations.route")(app);
require("./routes/admin/articles/articles.route")(app);
require("./routes/sessions/session-change.route")(app);
require("./routes/sessions/acess_keys.route")(app);
require("./routes/privileges.route")(app);
require("./routes/customers_routes/orders.route")(app);
require("./routes/customers_routes/comp-locations.route")(app);
require("./routes/tanduu_admin_routes/pages.route")(app);
require("./routes/admin/bank_accounts.route")(app);
require("./routes/admin/account/locations&services/location_services.route")(
    app
);
require("./routes/admin/cashbbok/cashbook.route")(app);
require("./routes/shop/shop_galerie.route")(app);
require("./routes/tanduu_admin_routes/stats.routes")(app);
require("./routes/customers_routes/suggested_category.route")(app);
require("./routes/key_words/key_words.route")(app);
require("./routes/tanduu_admin_routes/descriptions.route")(app);
require("./routes/interests/interests.route")(app);
require("./routes/users/blogs.route")(app);
require("./routes/socials/contact.route")(app);
require("./routes/socials/profile_settings.route")(app);
require("./routes/socials/profile_informations.route")(app);
require("./routes/socials/comments.route")(app);
require("./routes/socials/posts.route")(app);
require("./routes/socials/likes.route")(app);
require("./routes/socials/load-files.route")(app);
require("./routes/socials/report.route")(app);
require("./routes/socials/invitations.route")(app);
require("./routes/socials/media_posts.route")(app);
require("./routes/socials/hashtags.route")(app);
require("./routes/socials/saved.route")(app);
require("./routes/socials/stories.route")(app);
require("./routes/socials/bounces.route")(app);
require("./routes/socials/groups.route")(app);
require("./routes/socials/pages.route")(app);
require("./routes/socials/companies.route")(app);
require("./routes/socials/marketplace.route")(app);
app.post("/upload", controller.upload);
app.get("/files", controller.getListFiles);
app.get("/:type/:name", controller.download);

// set port, listen for requests

const PORT = process.env.PORT || 1333;
https
    .createServer({
            key: fs.readFileSync("./sslencryption/key.pem"),
            cert: fs.readFileSync("./sslencryption/cert.pem"),
            passphrase: "kais",
        },
        app
    )
    .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
/*const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);

});
/* Insert data into Roles table */

function initial() {
    Role.create({
        id: 1,
        name: "customer",
    });

    Role.create({
        id: 2,
        name: "jobber",
    });

    Role.create({
        id: 3,
        name: "admin",
    });
    Role.create({
        id: 4,
        name: "super_admin",
    });
    Role.create({
        id: 5,
        name: "tanduu_admin",
    });
    Role.create({
        id: 6,
        name: "commercial",
    });
}

/* Insert data into Currencies table */

function InsertCurrenciesData() {
    Currencies.create({
        id: 1,
        name: "Dollars",
        code: "USD",
        Symbol: "$",
    });
    Currencies.create({
        id: 2,
        name: "Euro",
        code: "EUR",
        Symbol: "â‚¬",
    });

    Currencies.create({
        id: 3,
        name: "Tunisian dinar",
        code: "DTN",
        Symbol: "DT",
    });
}