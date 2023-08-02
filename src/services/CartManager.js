import { writeFile, readFile } from "fs/promises";
import { resolve } from "path";
import productManager from "./ProductManager.js";

class CartManager {
    #carts;
    #path;
    constructor() {
        this.#path = resolve("./src/data/carts.json");
        this.#carts = [];
    }

    createCart = async () => {
        await this.#loadCarts();

        const id = Math.max(...this.#carts.map((p) => p.id)) + 1 ?? 1;

        const newCart = { id: id == -Infinity ? 1 : id, products: [] };

        this.#carts.push(newCart);

        await writeFile(this.#path, JSON.stringify(this.#carts, null, "\t"));

        return newCart;
    };

    getCartById = async (cid) => {
        await this.cartExists(cid);

        return this.#carts.find((c) => c.id == cid);
    };

    addProductInCart = async (cid, pid) => {
        await this.cartExists(cid);
        await productManager.productExists(pid);

        const product = await productManager.getProductById(pid);
        if (product.stock - 1 < 0) {
            throw new Error("El producto no cuenta con el stock suficiente");
        }

        this.#carts.map((c) => {
            return c.id == cid
                ? c.products.some((p) => p.product == pid)
                    ? c.product.map((p) => p.product == pid && p.quantity++)
                    : c.products.push({ product: pid, quantity: 1 })
                : c;
        });

        return await this.getCartById(cid);
    };

    cartExists = async (cid) => {
        await this.#loadCarts();

        if (!cid || isNaN(cid)) {
            throw new Error(`El cid es ${cid}, cuando debe ser un int`);
        }

        const existsCart = this.#carts.some((c) => c.id == cid);
        if (!existsCart) {
            throw new Error(`No existe el cart con id ${cid}`);
        }
    };

    #loadCarts = async () => {
        try {
            this.#carts = JSON.parse(await readFile(this.#path, "utf-8"));
        } catch {
            this.#carts = [];
        }
    };
}

const cartManager = new CartManager();
export default cartManager;
