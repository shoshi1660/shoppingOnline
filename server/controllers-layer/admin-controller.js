const express = require("express");

const clientsLogic = require("../business-logic-layer/clients-logic");
const verifyAdmin = require("../middleware/verify-admin");
const verifyLoggedIn = require("../middleware/verify-logged-in");

const router = express.Router();

router.get("/", [verifyLoggedIn, verifyAdmin], async (request, response) => {
    try {
        // const response=await ...
        response.send("Welcome Admin only services!!");
    }
    catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;