import { Router } from "express";
import productManager from "../dao/fileSystem/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();

    res.render("home", {
        products: products,
        title: "Products"
    });
});

router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();

    res.render("realTimeProducts", {
        title: "Productos en tiempo real",
        products: products.reverse()
    });
});

export default router;
