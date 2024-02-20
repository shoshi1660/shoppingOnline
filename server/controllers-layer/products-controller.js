const express = require("express");
const productsLogic = require("../business-logic-layer/products-logic")
const path = require("path");
const fileUpload = require("express-fileupload");
const ProductModel = require("../model/productModel");
const router = express.Router();
router.use(fileUpload());

router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.send(products);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "server error" }); //
    }
});

router.get("/amount", async (request, response) => {
    try {
        const amount = await productsLogic.getCountProductsAsync();
        response.send(amount);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "server error" }); //
    }
});

router.get("/images/:productImage", (request, response) => {
    try {
        // Data: 
        const productImage = request.params.productImage;

        // Logic: 
        let imageFile = path.join(__dirname, "..", "images", productImage);

        // Success: 
        response.sendFile(imageFile);
    }
    catch (err) {
        console.log(err.message);
        response.status(500).send({ message: "server error" });
    }
});

router.get("/idCategory/:idCategory", async (request, response) => {
    const idCategory = request.params.idCategory;
    if (isNaN(idCategory)) {
        response.status(400).send({ message: `Bad category numeber '${idCategory}'` });
    }
    else {
        try {
            const products = await productsLogic.getProductByIdCategory(idCategory);
            response.send(products);
        }
        catch (error) {
            console.log(error);
            response.status(500).send({ message: "server error" }); //
        }
    }
});

router.get("/:idProduct", async (request, response) => {
    const idProduct = request.params.idProduct;
    if (isNaN(idProduct)) {
        response.status(400).send({ message: `Bad product numeber '${idProduct}'` });
    }
    else {
        try {
            const product = await productsLogic.getProductByIdAsync(idProduct);
            response.send(product);
        }
        catch (error) {
            console.log(error);
            response.status(500).send({ message: "server error" }); //
        }
    }
});

router.get("/searchProduct/:str", async (request, response) => {
    const str = request.params.str;
    try {
        const product = await productsLogic.getProductByStr(str);
        response.send(product);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "server error" }); //
    }
});

router.post("/", async (request, response) => {
    try {
        const newProduct = new ProductModel(request.body);
        const error = newProduct.validate();
        if (error)
            response.status(400).send(error);
        else {
            const result = await productsLogic.addProduct(newProduct);
            newProduct.idProduct = result.insertId;
            response.status(201).send(newProduct);
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error.message); //{ message: "server error" }
    }
});

router.get("/all/categories", async (request, response) => {
    try {
        const categories = await productsLogic.getAllCategories();
        response.send(categories);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "server error" }); //
    }
});

router.put("/:id", async (req, res) => {
    // const idProduct = request.params.idProduct;
    // if (isNaN(idProduct)) {
    //     response.status(400).send({ message: `Bad product numeber '${idProduct}'` });
    // }
    // else {
        const idp = req.params.id;
    try {
        const newProduct = new ProductModel(req.body)
        const error = newProduct.validate();
        if (error) {
            res.status(400).send(error);
        }
        else {
            const product = await productsLogic.changeProduct(newProduct,idp);
            newProduct.idProduct = product.idProduct;
            res.status(201).send(product);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "server error" }); //
    }
});


module.exports = router;