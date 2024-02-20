const express = require("express");

const clientsLogic = require("../business-logic-layer/clients-logic");
const ClientModel = require("../model/client-model")

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const clients = await clientsLogic.getAllClientsAsync();
        response.send(clients);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "server error" }); //
    }
});

router.get("/:clientIdentity", async (request, response) => {
    const clientIdentity = request.params.clientIdentity;
    if (isNaN(clientIdentity)) {
        response.status(400).send({ message: `Bad client Identity '${clientIdentity}'` });
    }
    try {
        const client = await clientsLogic.getClientById(clientIdentity);
        if (client.length == 0)
            response.send(false);
        else
            response.send(true);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "server error" }); //
    }
});

router.post("/", async (request, response) => {
    try {
        const clientToAdd = new ClientModel(request.body);
        const error = clientToAdd.validate();
        if (error)
            response.status(400).send({ message: error.sqlMessage });
        else {
            const result = await clientsLogic.addClientAsync(clientToAdd);
            clientToAdd.id = result.insertId;
            response.status(201).send(clientToAdd);
        }
    } catch (error) {
        console.log(error);
        response.status(500).send(error.sqlMessage);
    }
});



module.exports = router;