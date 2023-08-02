import express from "express";
import routerProducts from "./routers/products.api.routes.js";
import routerCarts from "./routers/carts.api.routes.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);
app.use("*", (req, res) => {
    return res.status(400).json({
        status: error,
        message: "Bad request",
        data: []
    });
});

app.listen(port, () => {
    console.log(`Listen port: ${port}`);
});
