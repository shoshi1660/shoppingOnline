const express = require("express");
const citiesLogic = require("../business-logic-layer/cities-logic")
const router = express.Router()

router.get("/", async (request, response) => {
    try {
        const cities = await citiesLogic.getAllCities();
        response.send(cities);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message:"server error"}); //
    }
});

module.exports=router;