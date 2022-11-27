module.exports = (sequelize, Sequelize) => {
    const ProductsCompanies = sequelize.define("products_companies", {

        product_name: {
            type: Sequelize.STRING
        },
        cover: {
            type: Sequelize.JSON,
        },
        details: {
            type: Sequelize.JSON
        },
        is_deleted: {
            type: Sequelize.BOOLEAN
        }


    });

    return ProductsCompanies;
};