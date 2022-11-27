const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,

    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    dialectOptions: {
        autoJsonMap: false
    },
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});


/* GET ALL MODELS */
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/users.model.js")(sequelize, Sequelize);
db.role = require("../models/roles.model.js")(sequelize, Sequelize);
db.reset_password = require("../models/reset_passwords.model.js")(sequelize, Sequelize);
db.locations = require("../models/locations.model.js")(sequelize, Sequelize);
db.articles = require("../models/articles.model.js")(sequelize, Sequelize);
db.categories = require("../models/categories.model.js")(sequelize, Sequelize);
db.class_accounting = require("../models/class_accounting.model.js")(sequelize, Sequelize);
db.company_urgent_informations = require("../models/company_urgent_informations.model.js")(sequelize, Sequelize);
db.company_sources = require("../models/company-sources.model.js")(sequelize, Sequelize);
db.companies = require("./companies.model.js")(sequelize, Sequelize);
db.currencies = require("./Currencies.model.js")(sequelize, Sequelize);
db.customers = require("../models/customers.model.js")(sequelize, Sequelize);
db.group_chats = require("../models/group_chats.model.js")(sequelize, Sequelize);
db.notifications = require("../models/notification.model.js")(sequelize, Sequelize);
db.one_to_one_chats = require("../models/one_to_one_chat.model.js")(sequelize, Sequelize);
db.orders_services = require("../models/orders_service.model.js")(sequelize, Sequelize);
db.orders = require("../models/orders.model.js")(sequelize, Sequelize);
db.outer_customers = require("./outer_customers.model.js")(sequelize, Sequelize);
db.services = require("./services.model.js")(sequelize, Sequelize);
db.sub_categories = require("../models/sub_categories.model.js")(sequelize, Sequelize);
db.teams = require("../models/teams.model.js")(sequelize, Sequelize);
db.translations = require("../models/translations.model.js")(sequelize, Sequelize);
db.sessions = require("../models/users_sessions.model.js")(sequelize, Sequelize);
db.branches = require("../models/branches.model.js")(sequelize, Sequelize);
db.blogs = require("../models/blogs.model.js")(sequelize, Sequelize);
db.commercial = require("../models/commercial.model")(sequelize, Sequelize);
db.commercial_feed = require("../models/commercial_feed.model")(sequelize, Sequelize);
db.blog_comments = require("../models/blog_comments.model")(sequelize, Sequelize);
db.express_services = require("../models/express_services.model")(sequelize, Sequelize);
db.chat = require("../models/chat.model")(sequelize, Sequelize);
db.chat_company = require("../models/chat_company.model")(sequelize, Sequelize);
db.invitations = require("../models/invitations.model")(sequelize, Sequelize);
db.access_keys = require("../models/access_keys.model")(sequelize, Sequelize);
db.privileges = require("../models/priveleges.model")(sequelize, Sequelize);
db.received_orders = require("../models/received_orders.model")(sequelize, Sequelize);
db.pages = require("../models/pages.model")(sequelize, Sequelize);
db.bank_accounts = require("../models/banking_accounts.model")(sequelize, Sequelize)
db.cashbook = require("../models/cashbook.model")(sequelize, Sequelize)
db.products_company = require("../models/companies_product.model")(sequelize, Sequelize)
db.galleries = require("../models/gallery.model")(sequelize, Sequelize)
db.suggested = require("../models/suggestedcategories.model")(sequelize, Sequelize)
db.keywords = require("../models/keywords.model")(sequelize, Sequelize)
db.services_keywords = require("../models/services_key_words.model")(sequelize, Sequelize)
db.descriptions = require("../models/descriptions.model")(sequelize, Sequelize)
db.posts = require("../models/posts.model")(sequelize, Sequelize)
db.interests = require("../models/interests.model")(sequelize, Sequelize)
db.sub_interests = require("../models/sub_interests.model")(sequelize, Sequelize)
db.comments_posts = require("../models/comments_posts.model")(sequelize, Sequelize)
db.comments_replies = require("../models/comments_replies.model")(sequelize, Sequelize)
db.likes = require("../models/likes.model")(sequelize, Sequelize)
db.shared_posts = require("../models/shared_posts.model")(sequelize, Sequelize);
db.user_blogs = require("../models/user_blogs.model")(sequelize, Sequelize);
db.contacts = require("../models/contacts.model")(sequelize, Sequelize);
db.profile_settings = require("../models/profile_settings.model")(sequelize, Sequelize);
db.profile_informations = require("../models/profile_informations.model")(sequelize, Sequelize);
db.badges = require("../models/badges.model")(sequelize, Sequelize);
db.reports = require("../models/report.model")(sequelize, Sequelize);
db.reports_categories = require("../models/reports_categories.model")(sequelize, Sequelize);
db.reports_sub_categories = require("../models/report_sub_categories.model")(sequelize, Sequelize);
db.post_hashtags = require("../models/posts_hashtags.model")(sequelize, Sequelize);
db.albums = require("../models/albums.model")(sequelize, Sequelize);
db.media_posts = require("../models/media_posts.model")(sequelize, Sequelize);
db.saved_collections = require("../models/saved_collections.model")(sequelize, Sequelize);
db.saved_items = require("../models/saved_items.model")(sequelize, Sequelize);
db.stories = require("../models/stories.model")(sequelize, Sequelize);
db.bounces = require("../models/bounces.model")(sequelize, Sequelize);
db.pages_users = require("../models/pages_users.model")(sequelize, Sequelize);
db.groups = require("../models/group.model")(sequelize, Sequelize);
// ASSOCIATE FOREIGN KEY

/* ASSOCIATION USER => ROLES */
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

/* ASSOCIATION LOCATIONS => USERS */
db.locations.belongsTo(db.companies, {
    through: "companyId",
    foreignKey: "companyId",
    as: "company"
});

/* ASSOCIATION CUSTOMERS => USERS */
db.user.hasMany(db.customers);
db.customers.belongsTo(db.user);

/* ASSOCIATION COMPANIES => USERS */
db.user.hasMany(db.companies);
db.companies.belongsTo(db.user);

/* ASSOCIATION COMPANIES => TEAM */
db.companies.hasMany(db.teams);
db.teams.belongsTo(db.companies);

/* ASSOCIATION ARTICLES => USERS */
db.user.hasMany(db.articles);
db.articles.belongsTo(db.user);

/* ASSOCIATION SESSIONS => USERS */
db.user.hasMany(db.sessions);
db.sessions.belongsTo(db.user);

/* ASSOCIATION BRANCHES => USERS */
db.user.hasMany(db.branches);
db.branches.belongsTo(db.user);

/* ASSOCIATION COMMERCIALS => USERS */
db.user.hasMany(db.commercial);
db.commercial.belongsTo(db.user);

/* ASSOCIATION COMMERCIALS => COMMERCIAL FEEDS */
db.commercial.hasMany(db.commercial_feed);
db.commercial_feed.belongsTo(db.commercial);

/* ASSOCIATION COMPANIES => SOURCES */
db.companies.hasMany(db.company_sources);
db.company_sources.belongsTo(db.companies);

/* ASSOCIATION COMPANIES => COMPANY INFORMATIONS */
db.companies.hasMany(db.company_urgent_informations);
db.company_urgent_informations.belongsTo(db.companies);

/* ASSOCIATION COMPANIES => COMMERCIAL */
db.commercial.hasMany(db.companies);
db.companies.belongsTo(db.commercial);

/* ASSOCIATION COMPANIES => CHAT */
db.companies.hasMany(db.group_chats);
db.group_chats.belongsTo(db.companies);


/* ASSOCIATION SUB-CATEGORIES => SERVICES */
db.sub_categories.hasMany(db.services);
db.services.belongsTo(db.sub_categories);

/* ASSOCIATION CATEGORIES => SUB-CATEGORIES */
db.categories.hasMany(db.sub_categories);
db.sub_categories.belongsTo(db.categories);

/* ASSOCIATION CATEGORIES => BLOGS */
db.categories.hasMany(db.blogs);
db.blogs.belongsTo(db.categories);

/* ASSOCIATION SUB-CATEGORIES => BLOGS */
db.sub_categories.hasMany(db.blogs);
db.blogs.belongsTo(db.sub_categories);

/* ASSOCIATION ORDERS => CUSTOMERS */
db.orders.belongsTo(db.customers, {
    through: "customerId",
    foreignKey: "customerId",
    as: "customer"
});

/* ASSOCIATION ORDERS => COMPANY ACCEPTED */
db.orders.belongsTo(db.companies, {
    through: "jobberId",
    foreignKey: "jobberId",
    as: "jobberAccepted"
});

db.orders.belongsTo(db.companies, {
    through: "companyId",
    foreignKey: "companyId",
    as: "jobberSender"
});


/* ASSOCIATION ORDERS => OUTER CUSTOMER */
db.orders.belongsTo(db.outer_customers, {
    through: "outerCustomerId",
    foreignKey: "outerCustomerId",
    as: "outerCustomer"
});

/* ASSOCIATION ORDERS => SERVICES */
db.orders.hasMany(db.orders_services);
db.categories.hasMany(db.orders_services);
db.sub_categories.hasMany(db.orders_services);
db.services.hasMany(db.orders_services);
db.orders_services.belongsTo(db.orders);
db.orders_services.belongsTo(db.categories);
db.orders_services.belongsTo(db.sub_categories);
db.orders_services.belongsTo(db.services);

/* ASSOCIATION NOTIFICATIONS => USERS */
db.notifications.belongsTo(db.user, {
    through: "user",
    foreignKey: "senderId"
});
db.notifications.belongsTo(db.user, {
    foreignKey: "receiverId"
});

/* ASSOCIATION NOTIFICATIONS => USERS */
db.invitations.belongsTo(db.user, {
    through: "senderId",
    foreignKey: "senderId",
    as: "userSender"
});
db.invitations.belongsTo(db.user, {
    foreignKey: "receiverId",
    as: "userReceiver"
});
/* ASSOCIATION INVITATION AND ACCESS KEY*/
db.access_keys.belongsTo(db.invitations, {
    foreignKey: "invitationId",
    as: "invitation"
});
/* ASSOCIATION CUSTOMERS => USERS */
db.chat.belongsTo(db.user, {
    through: "user1",
    foreignKey: "user1",
    as: "user11"
});
db.chat.belongsTo(db.user, {
    through: "user2",
    foreignKey: "user2",
    as: "user21"
});
/* ASSOCIATION partners => access tokens */
db.access_keys.belongsTo(db.user, {
    through: "userId",
    foreignKey: "userId",
    as: "jobber"
});
/* ASSOCIATION partners => access tokens */
db.access_keys.belongsTo(db.companies, {
    through: "companyId",
    foreignKey: "companyId",
    as: "company"
});

/* ASSOCIATION PRIVILEGES => USER */
db.privileges.belongsTo(db.user, {
    through: "userId",
    foreignKey: "userId",
    as: "user"
});

// ASSOCIATION ORDERS => RECEIVED ORDERS
db.received_orders.belongsTo(db.orders, {
    through: "orderId",
    foreignKey: "orderId",
    as: "order"
});

/* ASSOCIATION COMPANIES => RECEIVED ORDERS */
db.received_orders.belongsTo(db.companies, {
    through: "senderId",
    foreignKey: "senderId",
    as: "sender"
});

/* ASSOCIATION COMPANIES => RECEIVED ORDERS */
db.received_orders.belongsTo(db.companies, {
    through: "receiverId",
    foreignKey: "receiverId",
    as: "receiver"
});

/* ASSOCIATION USERS => BANK ACCOUNTS */
db.bank_accounts.belongsTo(db.user, {
    through: "userId",
    foreignKey: "userId",
    as: "user"
});

/* ASSOCIATION USERS => CASHBOOK */
db.cashbook.belongsTo(db.user, {
    through: "userId",
    foreignKey: "userId",
    as: "user"
});

/* ASSOCIATION USERS => CASHBOOK */
db.cashbook.belongsTo(db.class_accounting, {
    through: "classId",
    foreignKey: "classId",
    as: "class"
});
/*  USERS => PRODUCT */
db.products_company.belongsTo(db.user, {
    through: "userId",
    foreignKey: "userId",
    as: "user"
});

/*  COMPANIES => GALLERIES */
db.products_company.belongsTo(db.companies, {
    through: "companyId",
    foreignKey: "companyId",
    as: "company"
});

/*  USERS => GALLERIES */
db.galleries.belongsTo(db.user, {
    through: "userId",
    foreignKey: "userId",
    as: "user"
});

/*  COMPANIES => GALLERIES */
db.galleries.belongsTo(db.companies, {
    through: "companyId",
    foreignKey: "companyId",
    as: "company"
});

/*  SERVICES => SERVICES KEYWORDS */
db.services_keywords.belongsTo(db.services, {
    through: "serviceId",
    foreignKey: "serviceId",
    as: "service"
});

/*  SERVICES => SERVICES KEYWORDS */
db.companies.belongsTo(db.categories, {
    through: "mainCategoryId",
    foreignKey: "mainCategoryId",
    as: "category"
});


/* socials index */

/* ASSOCIATION POSTS => USERS */
db.posts.belongsTo(db.user, {
    through: "posterUserId",
    foreignKey: "posterUserId",
    as: "user"
});

/* ASSOCIATION POSTS => COMPANIES */
db.posts.belongsTo(db.companies, {
    through: "posterCompanyId",
    foreignKey: "posterCompanyId",
    as: "company"
});

/* ASSOCIATION INTERESTS => SUB-INTERESTS */
db.sub_interests.belongsTo(db.interests, {
    through: "interestId",
    foreignKey: "interestId",
    as: "interest"
});

/* ASSOCIATION POSTS => COMMENTS */
/*db.comments_posts.belongsTo(db.posts, {
    through: "postId",
    foreignKey: "postId",
    as: "post"
});
*/
/* ASSOCIATION COMMENTS POSTS => USERS */
db.comments_posts.belongsTo(db.user, {
    through: "commenterUserId",
    foreignKey: "commenterUserId",
    as: "user"
});

/* ASSOCIATION COMMENTS => COMPANIES */
db.comments_posts.belongsTo(db.companies, {
    through: "commenterCompanyId",
    foreignKey: "commenterCompanyId",
    as: "company"
});

/* ASSOCIATION COMMENTS => REPLIES */
/*db.comments_replies.belongsTo(db.comments_posts, {
    through: "commentId",
    foreignKey: "commentId",
    as: "comment"
});*/

/* ASSOCIATION COMMENTS REPLIES => USERS */
db.comments_replies.belongsTo(db.user, {
    through: "commenterUserId",
    foreignKey: "commenterUserId",
    as: "user"
});

/* ASSOCIATION COMMENTS REPLIES => COMPANIES */
db.comments_replies.belongsTo(db.companies, {
    through: "commenterCompanyId",
    foreignKey: "commenterCompanyId",
    as: "company"
});

/* ASSOCIATION LIKES => USERS */
/*db.likes.belongsTo(db.user, {
    through: "likerUserId",
    foreignKey: "likerUserId",
    as: "user"
});

/* ASSOCIATION LIKES => COMPANIES 
db.likes.belongsTo(db.companies, {
    through: "likerCompanyId",
    foreignKey: "likerCompanyId",
    as: "company"
});*/

/* ASSOCIATION likes => POSTS */
/*db.likes.belongsTo(db.posts, {
    through: "postId",
    foreignKey: "postId",
    as: "post"
});*/
db.posts.hasMany(db.likes);
db.likes.belongsTo(db.posts);

db.posts.hasMany(db.comments_posts);
db.comments_posts.belongsTo(db.posts);

db.comments_posts.hasMany(db.comments_replies);
db.comments_replies.belongsTo(db.comments_posts);

db.comments_posts.hasMany(db.likes);
db.likes.belongsTo(db.comments_posts);

db.comments_replies.hasMany(db.likes);
db.likes.belongsTo(db.comments_replies);



/* ASSOCIATION LIKES => COMMENTS *
db.likes.belongsTo(db.comments_posts, {
    through: "commentId",
    foreignKey: "commentId",
    as: "comment"
});
/* ASSOCIATION LIKES => COMMENTS REPLIES 
db.likes.belongsTo(db.comments_replies, {
    through: "commentReplyId",
    foreignKey: "commentReplyId",
    as: "reply"
});

/* ASSOCIATION POST => SHARED POSTS */
db.shared_posts.belongsTo(db.posts, {
    through: "postId",
    foreignKey: "postId",
    as: "post"
});

/* ASSOCIATION POST => SHARED POSTS */
db.posts.belongsTo(db.posts, {
    through: "sharedPost",
    foreignKey: "sharedPost",
    as: "post"
});

/* ASSOCIATION LIKES => USERS */
db.shared_posts.belongsTo(db.user, {
    through: "sharerUserId",
    foreignKey: "sharererUserId",
    as: "sharerUser"
});

/* ASSOCIATION LIKES => COMPANIES */
db.shared_posts.belongsTo(db.companies, {
    through: "sharerCompanyId",
    foreignKey: "sharerCompanyId",
    as: "sharerCompany"
});

/* ASSOCIATION blogs => users */
db.user_blogs.belongsTo(db.user, {
    through: "userId",
    foreignKey: "userId",
    as: "user"
});

/* ASSOCIATION blogs => companies */
db.user_blogs.belongsTo(db.companies, {
    through: "companyId",
    foreignKey: "companyId",
    as: "company"
});

/* ASSOCIATION contacts => users */
db.contacts.belongsTo(db.user, {
    through: "userId",
    foreignKey: "userId",
    as: "user"
});

/* ASSOCIATION contacts => companies */
db.contacts.belongsTo(db.companies, {
    through: "companyId",
    foreignKey: "companyId",
    as: "company"
});

/* ASSOCIATION profile settings => users */
db.profile_settings.belongsTo(db.user, {
    through: "userId",
    foreignKey: "userId",
    as: "user"
});

/* ASSOCIATION profile settings => companies */
db.profile_settings.belongsTo(db.companies, {
    through: "companyId",
    foreignKey: "companyId",
    as: "company"
});

/* ASSOCIATION profile profile infos => users */
db.profile_informations.belongsTo(db.user, {
    through: "userId",
    foreignKey: "userId",
    as: "user"
});

/* ASSOCIATION profile profile infos => companies */
db.profile_informations.belongsTo(db.companies, {
    through: "companyId",
    foreignKey: "companyId",
    as: "company"
});

/* ASSOCIATION report and companies */
db.reports.belongsTo(db.companies, {
    through: "companyReporter",
    foreignKey: "companyReporter",
    as: "company"
});

/* ASSOCIATION report and user */
db.reports.belongsTo(db.user, {
    through: "userReporter",
    foreignKey: "userReporter",
    as: "user"
});

/* ASSOCIATION report and post */
db.reports.belongsTo(db.posts, {
    through: "postId",
    foreignKey: "postId",
    as: "post"
});
db.reports_categories.hasMany(db.reports_sub_categories);
db.reports_sub_categories.belongsTo(db.reports_categories);

/* albums and users */
db.user.hasMany(db.albums);
db.albums.belongsTo(db.user);

/* albums and companies */
db.companies.hasMany(db.albums);
db.albums.belongsTo(db.companies);

/* media posts and users */
db.user.hasMany(db.media_posts);
db.media_posts.belongsTo(db.user);

/* media posts and companies */
db.companies.hasMany(db.media_posts);
db.media_posts.belongsTo(db.companies);

/* media posts and companies */
db.posts.hasMany(db.media_posts);
db.media_posts.belongsTo(db.posts);
/* albums and companies */
db.albums.hasMany(db.media_posts);
db.media_posts.belongsTo(db.albums);

/* like and media posts */
db.media_posts.hasMany(db.likes);
db.likes.belongsTo(db.media_posts);

/* comments and media posts */
db.media_posts.hasMany(db.comments_posts);
db.comments_posts.belongsTo(db.media_posts);

/* posts and albums */
db.albums.hasMany(db.posts);
db.posts.belongsTo(db.albums);

/* posts and blogs */
db.user_blogs.hasMany(db.posts);
db.posts.belongsTo(db.user_blogs);

/* pages and users */
db.pages_users.hasMany(db.posts);
db.posts.belongsTo(db.pages_users);

/* groups and posts */
db.groups.hasMany(db.posts);
db.posts.belongsTo(db.groups);

/* albums and pages */
db.pages_users.hasMany(db.albums);
db.albums.belongsTo(db.pages_users);

/* albums and group */
db.groups.hasMany(db.albums);
db.albums.belongsTo(db.groups);


/* user and saved collections */
db.user.hasMany(db.saved_collections);
db.saved_collections.belongsTo(db.user);

/* categories and pages users */
db.categories.hasMany(db.user_blogs);
db.user_blogs.belongsTo(db.categories);

/* companies and saved collections */
db.companies.hasMany(db.saved_collections);
db.saved_collections.belongsTo(db.companies);

/* user and saved items */
db.user.hasMany(db.saved_items);
db.saved_items.belongsTo(db.user);

/* companies and saved items */
db.companies.hasMany(db.saved_items);
db.saved_items.belongsTo(db.companies);

/* post and saved items */
db.posts.hasMany(db.saved_items);
db.saved_items.belongsTo(db.posts);

/* saved Collection and saved items */
db.saved_collections.hasMany(db.saved_items);
db.saved_items.belongsTo(db.saved_collections);

/* user and stories */
db.user.hasMany(db.stories);
db.stories.belongsTo(db.user);

/* companies and stories */
db.companies.hasMany(db.stories);
db.stories.belongsTo(db.companies);

/* like and stories */
db.stories.hasMany(db.likes);
db.likes.belongsTo(db.stories);

/* user and bounces */
db.user.hasMany(db.bounces);
db.bounces.belongsTo(db.user);

/* companies and bounces */
db.companies.hasMany(db.bounces);
db.bounces.belongsTo(db.companies);

/* like and stories */
db.bounces.hasMany(db.likes);
db.likes.belongsTo(db.bounces);

/* like and stories */
db.bounces.hasMany(db.comments_posts);
db.comments_posts.belongsTo(db.bounces);


/* bounces and posts */
db.bounces.hasMany(db.posts);
db.posts.belongsTo(db.bounces);

/* users and pages */
db.user.hasMany(db.pages_users);
db.pages_users.belongsTo(db.user);

/* users and groups */
db.user.hasMany(db.groups);
db.groups.belongsTo(db.user);

/* companies and pages */
db.companies.hasMany(db.pages_users);
db.pages_users.belongsTo(db.companies);

/* contact and pages */
db.pages_users.hasMany(db.contacts);
db.contacts.belongsTo(db.pages_users);

/* contact and pages */
db.groups.hasMany(db.contacts);
db.contacts.belongsTo(db.groups);


db.ROLES = ["admin", "jobber", "customer", "super_admin", "tanduu_admin", "commercial"];
module.exports = db;