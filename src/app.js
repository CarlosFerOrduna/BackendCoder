import express from "express";
import handlebars from "express-handlebars";
import routerCarts from "./routers/carts.api.routes.js";
import routerProducts from "./routers/products.api.routes.js";
import routerViews from "./routers/products.views.routes.js";
import __dirname from "./utils/dirname.utils.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

app.use("/views/products", routerViews);

app.use("*", (req, res) => {
    return res.status(400).json({
        status: "error",
        message: "Bad request",
        data: []
    });
});

app.listen(port, () => {
    console.log(`Listen port: ${port}`);
});
