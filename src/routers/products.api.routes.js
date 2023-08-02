import { Router } from "express";
import productManager from "../model/ProductManager.model.js";
import { uploader } from "../utils/multer.utils.js";

const routerProducts = Router();

routerProducts.get("/", async (req, res) => {
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

routerProducts.get("/:pid", async (req, res) => {
    const { pid } = req.params;

    if (!pid || isNaN(pid)) {
        return res.status(400).json({
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

routerProducts.post("/", uploader.single("file"), async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category } = req.body;

        const product = await productManager.addProduct({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails: req?.file?.filename
        });

        return res.status(201).json({
            status: "success",
            message: "product created with success",
            data: product
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

routerProducts.put("/:pid", uploader.single("file"), async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category } = req.body;
        const { pid } = req.params;

        const product = await productManager.updateProduct({
            id: pid,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails: req?.file?.filename
        });

        return res.status(200).json({
            status: "success",
            message: "product updated with success",
            data: product
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

routerProducts.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        await productManager.deleteProduct(pid);

        return res.status(204).json({
            status: "success",
            message: "product deleted with success",
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
            data: {}
        });
    }
});

export default routerProducts;
