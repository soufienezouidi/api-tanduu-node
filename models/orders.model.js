module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define("orders", {

                jobbers_list: {
                    type: Sequelize.JSON
                },
                reference: {
                    type: Sequelize.STRING
                },
                location: {
                    type: Sequelize.JSON
                },
                original_price: {
                    type: Sequelize.DOUBLE
                },
                deduction_amount: {
                    type: Sequelize.DOUBLE
                },
                tools: {
                    type: Sequelize.JSON
                },
                check_order_status: {
                    type: Sequelize.STRING
                },
                invoice_price: {
                    type: Sequelize.DOUBLE
                },
                pay_cash: {
                    type: Sequelize.JSON
                },
                pay_card: {
                    type: Sequelize.BOOLEAN
                },
                appointment_date: {
                    type: Sequelize.DATE
                },
                informations: {
                    type: Sequelize.JSON
                },
                status: {
                    type: Sequelize.STRING
                },
                show_mobile: {
                    type: Sequelize.BOOLEAN
                },
                show_phone: {
                    type: Sequelize.BOOLEAN
                },
                note: {
                    type: Sequelize.JSON
                },
                description: {
                    type: Sequelize.STRING
                },
                invoice_sent: {
                    type: Sequelize.BOOLEAN
                },
                is_payed: {
                    type: Sequelize.BOOLEAN
                },
                order_index: {
                    type: Sequelize.INTEGER
                },
                provision: {
                    type: Sequelize.INTEGER
                },
                source: {
                    type: Sequelize.STRING
                },
                is_deleted: {
                    type: Sequelize.BOOLEAN
                },
                object: {
                    type: Sequelize.JSON
                }

            }
        )
    ;

    return Orders;
}
;
