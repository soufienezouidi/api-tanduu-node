module.exports = (sequelize, Sequelize) => {
    const Transltation = sequelize.define("translations", {
        page: {
            type: Sequelize.STRING
        },
        reference: {
            type: Sequelize.STRING
        },
        section: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        },
        original_text_en: {
            type: Sequelize.TEXT
        },
        original_text_fr: {
            type: Sequelize.TEXT
        },
        original_text_de: {
            type: Sequelize.TEXT
        },
        original_text_ar: {
            type: Sequelize.TEXT
        },
        original_text_it: {
            type: Sequelize.TEXT
        },
        original_text_po: {
            type: Sequelize.TEXT
        },
        original_text_pt: {
            type: Sequelize.TEXT
        },
        original_text_sv: {
            type: Sequelize.TEXT
        },
        original_text_su: {
            type: Sequelize.TEXT
        },
        original_text_nth: {
            type: Sequelize.TEXT
        },
        original_text_far: {
            type: Sequelize.TEXT
        },
        original_text_es: {
            type: Sequelize.TEXT
        },
        index: {
            type: Sequelize.INTEGER
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }
    });

    return Transltation;
};