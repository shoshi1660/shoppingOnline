const express = require("express");

const verifyLoggedIn=require("../middleware/verify-logged-in")

const router = express.Router();

router.get("/", verifyLoggedIn, async (request, response) => {
    try {

        response.send("OK - Medium");
    }
    catch (error) {
        response.status(500).send(error);
    }
});

router.get("/:id", verifyLoggedIn, async (request, response) => {
    const id = request.params.id
    try {
        response.send("OK - Medium by " + id);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;