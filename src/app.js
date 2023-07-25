import express from "express";
import { productManager } from "./model/ProductManager.js";

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (limit && !isNaN(limit)) {
        return res.status(200).json({
            status: "success",
            message: `Products limited to ${limit}`,
            data: products.slice(0, limit)
        });
    }

    return res.status(200).json({
        status: "success",
        message: "All products",
        data: products
    });
});

app.get("products/:pid", async (req, res) => {
    const { pid } = req.params;

    if (!pid || isNaN(pid)) {
        return res.status(404).json({
            status: "error",
            message: "pid not valid",
            date: {}
        });
    }

    const product = await productManager.getProductById(pid);
    if (!product) {
        return res.status(404).json({
            status: "error",
            message: "Product not found",
            data: {}
        });
    }

    return res.status(200).json({
        status: "success",
        message: "Product found successful",
        data: product
    });
});

app.listen(port, () => {
    console.log(`Listen port: ${port}`);
});
