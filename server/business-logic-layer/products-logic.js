const dal = require("../data-access-layer/dal");
const path = require("path");
const mv = require("move");
async function getAllProductsAsync() {
    return await dal.executeQueryAsync("SELECT * FROM `product`");
};

async function getProductByIdAsync(productId) {
    const product = await dal.executeQueryAsync("SELECT * FROM `product` WHERE `idProduct`=?", [productId])
    return product;
};

async function getCountProductsAsync() {
    return await dal.executeQueryAsync("SELECT COUNT(`idProduct`) as amount FROM `product`");
};

async function getProductByIdCategory(idCategory) {
    return await dal.executeQueryAsync("SELECT * FROM product WHERE idCategory=?", [idCategory])
}

async function addProduct(product) {
    // const absolutePath = path.join(__dirname, "..", "images", image.name);
    // await image.mv(absolutePath);   // mv = move
    // console.log(absolutePath);
    return await dal.executeQueryAsync(
        "insert into `product` values (DEFAULT,?,?,?,?)", [product.productName, product.idCategory, product.productPrice, product.productImage]);
}

async function getProductByStr(searchStr) {
    const product = await dal.executeQueryAsync(`SELECT * FROM product WHERE productName like '%${searchStr}%'`)
    return product;
};

async function getAllCategories() {
    return await dal.executeQueryAsync(`SELECT * FROM productscategory`)
}

async function changeProduct(product,id) {
    // const absolutePath = path.join(__dirname, "..", "images", image.name);
    // await image.mv(absolutePath);   // mv = move
    // console.log(absolutePath);
    return await dal.executeQueryAsync(`UPDATE product SET productName=?,idCategory=?,productPrice=?,productImage=? WHERE idProduct=${id}`,[product.productName, product.idCategory, product.productPrice, product.productImage])
    // return await dal.executeQueryAsync(`UPDATE product SET productName=${product.productName},idCategory=${product.idCategory},productPrice=${product.productPrice},productImage=${product.productImage} WHERE idProduct=${product.idProduct}`)
}

module.exports = {
    getAllProductsAsync,
    getProductByIdAsync,
    getCountProductsAsync,
    addProduct,
    getProductByIdCategory,
    getProductByStr,
    getAllCategories,
    changeProduct
};