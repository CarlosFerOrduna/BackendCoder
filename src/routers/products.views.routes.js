import { Router } from "express";
import productManager from "../services/ProductManager.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();

    res.render("products", {
        products: products,
        title: "Products"
    });
});

export default router;
