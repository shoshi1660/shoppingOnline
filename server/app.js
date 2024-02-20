const express = require("express");
const cors = require("cors");

const authLoginController=require("./controllers-layer/auth-controller");
const clientsController=require("./controllers-layer/clients-controller");//
const adminController=require("./controllers-layer/admin-controller");//
const userLoggedInController=require("./controllers-layer/user-LoggedIn-controller");//
const citiesController=require("./controllers-layer/cities-controller");
const productsController=require("./controllers-layer/products-controller");
const ordersController=require("./controllers-layer/orders-controller");
const cartController=require("./controllers-layer/cart-controller");

const server = express();
server.use(cors());
server.use(express.json());

server.use("/admin", adminController);//
server.use("/user", userLoggedInController);//
server.use("/login", authLoginController);//
server.use("/api/clients", clientsController);//
server.use("/api/cities", citiesController);//
server.use("/api/products", productsController);//
server.use("/api/orders", ordersController);//
server.use("/api/cart", cartController);//

server.use("*", (request, response) => {
    response.status(404).send(`Route not found ${request.originalUrl}`);
});

server.listen(4000, () => {
    console.log("Listening on 4000");
}).on("error", (err) => {
    if (err.code === "EADDRINUSE")
        console.log("Error: Address in use");
    else 
        console.log("Error: Unknown error");
});