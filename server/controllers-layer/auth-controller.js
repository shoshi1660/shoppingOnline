const express = require("express");

const clientsLogic = require("../business-logic-layer/clients-logic");
const CredentialsModel = require("../model/credentials-model")

const router = express.Router();

// Login: 
router.post("/", async (request, response) => {
    try {
        // Data: 
        const credentials = new CredentialsModel(request.body);

        // Validation: 
        const errors = credentials.validate();
        if (errors)
            return response.status(400).send(errors);

        // Logic: 
        const loggedInUser = await clientsLogic.loginAsync(credentials);
        
        if (!loggedInUser)
            return response.status(401).send("Incorrect username or password.");

        // Success: 
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;