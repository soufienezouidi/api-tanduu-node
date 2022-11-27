module.exports = (sequelize, Sequelize) => {
    const BalancingList = sequelize.define("balancing_list", {

                balancing_details: {
                    type: Sequelize.JSON,
                },
                is_deleted: {
                    type: Sequelize.BOOLEAN
                }
            }
        )
    ;

    return BalancingList;
}
;
