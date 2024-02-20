const express = require("express");
const cartLogic = require("../business-logic-layer/cart-logic");
const ItemCartModel = require("../model/itemCart-model");
const CartModel = require("../model/cart-model")
const router = express.Router();

router.get("/cartExist/:clientIdentity", async (request, response) => {
    const cartId = request.params.clientIdentity;
    if (isNaN(cartId)) {
        response.status(400).send({ message: `Bad cart numeber '${cartId}'` });
    }
    else {
        try {
            const cart = await cartLogic.getIfCartOpenById(cartId);
            response.send(cart);
        }
        catch (error) {
            console.log(error);
            response.status(500).send(); //
        }
    }
});

// מחזיר מחיר ותאריך של העגלה לפי מ.ז. של הלקוח
router.get("/general/date/:clientIdentity", async (request, response) => {
    const cartId=request.params.clientIdentity;
    if(isNaN(cartId)){
        response.status(400).send({ message: `Bad cart numeber '${cartId}'` });
    }
    else{
        try {
            const cart = await cartLogic.getGeneralDateFromCart(cartId);
            response.send(cart);
        }
        catch (error) {
            console.log(error);
            response.status(500).send(); //
        }
    }

})

router.get("/itemCart/general/date/:idCart", async (request, response) => {
    const cartId = request.params.idCart;
    if (isNaN(cartId)) {
        response.status(400).send({ message: `Bad cart numeber '${cartId}'` });
    }
    else {
        try {
            const cart = await cartLogic.getCart(cartId);
            response.send(cart);
        }
        catch (error) {
            console.log(error);
            response.status(500).send(); //
        }
    }

})

router.post("/", async (request, response) => {
    try {
        const newCart = new CartModel(request.body);
        const error = newCart.validate();
        if (error)
            response.status(400).send(error);
        else {
            const result = await cartLogic.addCart(newCart);
            newCart.idCart = result.insertId;
            response.status(201).send(newCart);
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});

router.post("/itemCart", async (request, response) => {
    try {
        const items = new ItemCartModel(request.body);
        const error = items.validate();
        if (error)
            response.status(400).send(error);
        else {
            const result = await cartLogic.addItemCart(items);
            items.idItem = result.insertId;
            response.status(201).send(items);
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});
router.delete("/:id", async (request, response) => {
    const itemCart = request.params.id;
    if (isNaN(itemCart)) {
        response.status(400).send({ message: `Bad cart numeber '${itemCart}` });
    }
    else {
        try {
            const result = await cartLogic.deletItemCart(itemCart);
            // console.log(retVal);
            if (result.affectedRows >= 1)
                response.send({ message: `deleted ${itemCart}` });
            else
                response.status(404).send({ message: `item not found '${itemCart}'` });
        }
        catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    }
});

router.delete("/allItem/:id", async (request, response) => {
    const idCart = request.params.id;
    if (isNaN(idCart)) {
        response.status(400).send({ message: `Bad cart numeber '${idCart}'` });
    }
    else {
        try {
            const result = await cartLogic.deletAllItemsCart(idCart);
            // console.log(retVal);
            if (result.affectedRows >= 1)
                response.send({ message: `deleted ${idCart}` });
            else
                response.status(404).send({ message: `Cart not found '${idCart}'` });
        }
        catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    }
});

router.delete("/onlyCart/empty/:id", async (request, response) => {
    const idCart = request.params.id;
    if (isNaN(idCart)) {
        response.status(400).send({ message: `Bad cart numeber '${idCart}'` });
    }
    else {
        try {
            const result = await cartLogic.deletAllItemsCart(idCart);
            // console.log(retVal);
            if (result.affectedRows >= 1)
                response.send({ message: `deleted ${idCart}` });
            else
                response.status(404).send({ message: `Cart not found '${idCart}'` });
        }
        catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    }
});



router.put("/:id", async (req, res) => {
          const idItem = req.params.id;
    try {
            const item = await cartLogic.changeItem(req.body,idItem);
            const a = item.idItem;
            res.status(201).send(item);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error); //
    }
});


module.exports = router;