const express = require("express");
const router = express.Router();
const ordersLogic=require("../business-logic-layer/orders-logic");
const OrderModel=require("../model/order-model");
router.get("/", async (request, response) => {
    try {
        const orders = await ordersLogic.getAllOrdersAsync();
        response.send(orders);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message:"server error"}); //
    }
});

router.get("/amount", async (request, response) => {
    try {
        const amount = await ordersLogic.getCountOrdersAsync();
        response.send(amount);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message:"server error"}); //
    }
});

router.get("/clientIdentity/:clientIdentity", async (request, response) => {
    const clientIdentity = request.params.clientIdentity;
    if (isNaN(clientIdentity)) {
        response.status(400).send({ message: `Bad client Identity '${clientIdentity}'` });
    }
    else {
        try {
            const order = await ordersLogic.getOrderByClientIdentityAsync(clientIdentity);
            response.send(order);
        }
        catch (error) {
            console.log(error);
            response.status(500).send(); //
        }
    }
});

router.get("/orderDate/:clientIdentity", async (request, response) => {
    const clientIdentity = request.params.clientIdentity;
    if (isNaN(clientIdentity)) {
        response.status(400).send({ message: `Bad client Identity '${clientIdentity}'` });
    }
    else {
        try {
            const order = await ordersLogic.getOrdersDateAsync(clientIdentity);
            response.send(order);
        }
        catch (error) {
            console.log(error);
            response.status(500).send(); //
        }
    }
});

router.post("/", async (request, response) => {
    try {
        const newOrder = new OrderModel(request.body);
        const error = newOrder.validate();
        if (error)
            response.status(400).send(error);
        else {
            const result = await ordersLogic.addOrderAsync(newOrder);
            // newOrder.idOrder = result.insertId;
            response.status(201).send(result);
        }
    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }
});
router.get("/takenDates", async (request, response) => {
    try {
        const dates = await ordersLogic.getTakenDate();
        response.send(dates);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "server error" }); //
    }
});



module.exports = router;