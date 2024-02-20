const dal = require("../data-access-layer/dal");

async function getAllCities() {
    return await dal.executeQueryAsync("SELECT * FROM cities");
}

module.exports = {
    getAllCities
}