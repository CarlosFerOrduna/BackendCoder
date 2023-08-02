import express from "express";
import routerProducts from "./routers/products.api.routes.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/products", routerProducts);

app.listen(port, () => {
    console.log(`Listen port: ${port}`);
});
