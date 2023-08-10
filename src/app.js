import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import routerCarts from "./routers/carts.api.routes.js";
import routerProducts from "./routers/products.api.routes.js";
import routerViews from "./routers/products.views.routes.js";
import productManager from "./services/ProductManager.js";
import __dirname from "./utils/dirname.utils.js";

const app = express();
const port = 8080;

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

app.use("/views/products", routerViews);

app.use("/views", routerViews);

app.use("*", (req, res) => {
    return res.status(400).json({
        status: "error",
        message: "Bad request",
        data: []
    });
});

const httpServer = app.listen(port, () => {
    console.log(`Listen port: ${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
    try {
        const products = await productManager.getProducts();

        socketServer.emit("load_products", { products });

        socket.on("create_product", async (data) => {
            await productManager.addProduct(data);

            socketServer.emit("load_products", { products });
        });

        socket.on("delete_product", async (data) => {
            await productManager.deleteProduct(data);

            socketServer.emit("load_products", { data });
        });
    } catch (error) {
        console.error(error.message);
    }
});
