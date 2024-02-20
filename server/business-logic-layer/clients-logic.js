const dal = require("../data-access-layer/dal");
const jwt = require("jsonwebtoken");

async function getAllClientsAsync() {
    return await dal.executeQueryAsync("select * from client");
}

async function getClientById(clientIdentity){
    return await dal.executeQueryAsync("select * from client WHERE clientIdentity=?",[clientIdentity])
}

async function addClientAsync(client) {console.log(11);
    return await dal.executeQueryAsync("insert into `client` values (?,?,?,?,?,?,DEFAULT,?,?)",
        [client.clientIdentity, client.clientName, client.clientLastName, client.clientUserName,
        client.clientEmail, client.clientPassword, client.idCity, client.street]
    );
}

async function loginAsync(credentials) {
    const user = await dal.executeQueryAsync(
        `
            SELECT * FROM client
            WHERE clientUserName='${credentials.clientUserName}'
            AND clientPassword='${credentials.clientPassword}'
        `
    );
    if (!user || user.length < 1)
        return null;
    delete user[0].clientPassword;
    // user.token = jwt.sign({ user }, config.jwtKey, { expiresIn: "5h" });

    user[0].token = jwt.sign({ user: user[0] }, "zot hahizdamnut lenasot et jey dablyou tea", { expiresIn: "5 hours" });
    return user[0];
}



module.exports = {
    getAllClientsAsync,
    addClientAsync,
    loginAsync,
    getClientById,
};