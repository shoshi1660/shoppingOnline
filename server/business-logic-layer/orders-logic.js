const dal = require("../data-access-layer/dal");

async function getAllOrdersAsync() {
    return await dal.executeQueryAsync("SELECT * FROM `order`");
};

async function getOrderByIdAsync(idOrder) {
    const order = await dal.executeQueryAsync("SELECT * FROM `order` WHERE `idOrder`=?", [idOrder])
    return order;
};

async function getOrderByClientIdentityAsync(clientIdentity) {
    return await dal.executeQueryAsync("SELECT * FROM `order` WHERE `clientIdentity`=?", [clientIdentity])
};

async function getCountOrdersAsync() {
    return await dal.executeQueryAsync("SELECT count(`idOrder`) as amount FROM `order`");
};

async function getOrdersDateAsync(clientIdentity) {
    return await dal.executeQueryAsync("SELECT `order`.orderDate FROM `order` WHERE `order`.clientIdentity=? ORDER BY `order`.`orderDate` DESC LIMIT 1", [clientIdentity]);
};

async function addOrderAsync(newOrder) {
    return await dal.executeQueryAsync("insert into `order` values (DEFAULT,?,?,?,?,?,?,?,?)",
        [newOrder.clientIdentity, newOrder.idCart,
        newOrder.finalPrice, newOrder.idCity, newOrder.street,
        newOrder.shipingDate, newOrder.orderDate, newOrder.fourLastDigits]
    );
}
async function getTakenDate(){
    return await dal.executeQueryAsync("SELECT `shipingDate` FROM `order` GROUP BY `shipingDate` HAVING COUNT(*)>2")
}

module.exports = {
    getAllOrdersAsync,
    getOrderByIdAsync,
    getCountOrdersAsync,
    getOrderByClientIdentityAsync,
    getOrdersDateAsync,
    addOrderAsync,
    getTakenDate};
