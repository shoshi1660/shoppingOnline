const dal = require("../data-access-layer/dal");


async function getIfCartOpenById(clientIdentity) {
    return await dal.executeQueryAsync
        ("select cart.idCart, cart.cartCreationDate, cart.clientIdentity, SUM(items.generalPrice) as `finallPrice` FROM `shoppingcart` cart join `itemcart` items ON items.idCart = cart.idCart WHERE cart.clientIdentity =" + clientIdentity+ " and cart.idCart NOT IN(select o.idCart from`order` o where  o.clientIdentity ="+ clientIdentity+") LIMIT 1", [clientIdentity])
}

async function getGeneralDateFromCart(clientIdentity) {
    const result = await dal.executeQueryAsync(
        `select itemcart.generalPrice,shoppingcart.cartCreationDate
        from itemcart
        INNER JOIN shoppingcart
        on shoppingcart.idCart=itemcart.idCart
        WHERE shoppingcart.clientIdentity=${clientIdentity}`);
    return result;
}

async function getCart(idCart) {
    return await dal.executeQueryAsync(`
    select itemCart.idItem, itemcart.generalPrice,shoppingcart.cartCreationDate,product.productName,product.idProduct, product.productPrice, product.productImage,itemcart.ProductQuantity
        from shoppingcart
        INNER JOIN itemcart
        on itemcart.idCart= shoppingcart.idCart
        INNER JOIN product
        on product.idProduct=itemcart.idProduct
        WHERE shoppingcart.idCart=?`, [idCart])
}

async function addCart(newCart) {
    return await dal.executeQueryAsync("insert into `shoppingcart` values (DEFAULT,?,?)",
        [newCart.clientIdentity, newCart.cartCreationDate]
    );
}
async function deletCart(idCart) {
    return await dal.executeQueryAsync("DELETE FROM `itemcart` WHERE `idCart`=?", [idCart]);
}

async function addItemCart(item) {
    return await dal.executeQueryAsync("INSERT INTO itemCart values (DEFAULT,?,?,?,?)",
        [item.idProduct, item.ProductQuantity, item.generalPrice, item.idCart],
    );
}

async function deletItemCart(idItem) {
    return await dal.executeQueryAsync("DELETE FROM `itemcart` WHERE `idItem`=?", [idItem])
}
async function deletAllItemsCart(idCart) {
    await dal.executeQueryAsync("DELETE FROM `itemcart` WHERE `idCart`=?", [idCart])
    return await dal.executeQueryAsync("DELETE FROM `shoppingcart` WHERE `idCart`=?", [idCart])
}
async function changeItem(item,idItem) {
       return await dal.executeQueryAsync(`UPDATE itemcart SET ProductQuantity=?,generalPrice=? WHERE idItem=${idItem}`,[item.ProductQuantity,item.generalPrice])
}


module.exports = {
    getIfCartOpenById,
    getGeneralDateFromCart,
    // getItemCart,
    getCart,
    addCart,
    addItemCart,
    deletItemCart,
    changeItem,
    deletAllItemsCart,
    deletCart
}