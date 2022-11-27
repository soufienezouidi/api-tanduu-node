module.exports = (sequelize, Sequelize) => {
    const Groups = sequelize.define("group", {
        name: {
            type: Sequelize.STRING,
        },
        appartment_number: {
            type: Sequelize.STRING,
        },
        additive: {
            type: Sequelize.STRING,
        },
        street_number: {
            type: Sequelize.STRING,
        },
        street: {
            type: Sequelize.STRING,
        },
        cover_position: {
            type: Sequelize.JSON,
        },
        city: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        country: {
            type: Sequelize.STRING,
        },
        longitude: {
            type: Sequelize.DOUBLE,
        },
        latitude: {
            type: Sequelize.DOUBLE,
        },
        zip_code: {
            type: Sequelize.STRING,
        },
        phone1: {
            type: Sequelize.STRING,
        },
        phone2: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        fax: {
            type: Sequelize.STRING,
        },
        website: {
            type: Sequelize.STRING,
        },
        socials: {
            type: Sequelize.JSON,
        },
        admin: {
            type: Sequelize.JSON,
        },
        categories: {
            type: Sequelize.JSON,
        },
        description: {
            type: Sequelize.TEXT,
        },
        email_signature: {
            type: Sequelize.TEXT,
        },
        visibility: {
            type: Sequelize.STRING,
        },
        avatar: {
            type: Sequelize.STRING,
        },
        cover: {
            type: Sequelize.STRING,
        },
        opened: {
            type: Sequelize.STRING,
        },
        closed: {
            type: Sequelize.STRING,
        },

        hashtags: {
            type: Sequelize.JSON,
        },
        list_phones: {
            type: Sequelize.JSON,
        },
        average_rating: {
            type: Sequelize.DOUBLE,
        },
        is_pro: {
            type: Sequelize.BOOLEAN,
        },
        is_commercial: {
            type: Sequelize.BOOLEAN,
        },
        is_agency: {
            type: Sequelize.BOOLEAN,
        },
        show_card: {
            type: Sequelize.BOOLEAN,
        },
        show_phone: {
            type: Sequelize.BOOLEAN,
        },
        show_email: {
            type: Sequelize.BOOLEAN,
        },
        show_website: {
            type: Sequelize.BOOLEAN,
        },
        terms: {
            type: Sequelize.TEXT,
        },
        terms_fr: {
            type: Sequelize.TEXT,
        },
        terms_de: {
            type: Sequelize.TEXT,
        },
        privacy: {
            type: Sequelize.TEXT,
        },
        code_phone: {
            type: Sequelize.STRING,
        },
        code_mobile: {
            type: Sequelize.STRING,
        },
        registation_complete: {
            type: Sequelize.BOOLEAN,
        },
        page_link: {
            type: Sequelize.STRING,
        },
        logo_updated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        cover_updated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });

    return Groups;
};