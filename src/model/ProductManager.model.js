import { writeFile, readFile } from "fs/promises";
import { resolve } from "path";

class ProductManager {
    #products;
    #path;

    constructor() {
        this.#path = resolve("./src/data/products.json");
        this.#products = [];
    }

    addProduct = async (product) => {
        await this.#loadProducts();

        if (!product?.title || !isNaN(product.title)) {
            throw new Error(`El titulo es ${product.title}, cuando debe ser un string`);
        }

        if (!product?.description || !isNaN(product.description)) {
            throw new Error(`La description es ${product.title}, cuando debe ser un string`);
        }

        if (!product?.code || !isNaN(product.code)) {
            throw new Error(`El codigo es ${product.code}, cuando debe ser un string`);
        }

        if (!product?.price || isNaN(product.price)) {
            throw new Error(`El precio es ${product.price}, cuando debe ser un numero`);
        }

        if (!product?.status || !typeof product.status == "boolean") {
            product.status = true;
        }

        if (!product?.stock || isNaN(product.stock)) {
            throw new Error(`El stock es ${product.stock}, cuando debe ser un numero`);
        }

        if (!product?.category || !isNaN(product.category)) {
            throw new Error(`El category es ${product.category}, cuando debe ser un string`);
        }

        product.thumbnails = product?.thumbnails
            ? [`http://localhost:8080/assets/${product.thumbnails}`]
            : [];

        const codeExists = this.#products.some((p) => p.code === product.code);
        if (codeExists) {
            throw new Error(`El codigo ya existe`);
        }

        const id = Math.max(...this.#products.map((p) => p.id)) + 1 ?? 1;

        const newProduct = { id: id == -Infinity ? 1 : id, ...product };

        this.#products.push(newProduct);

        await writeFile(this.#path, JSON.stringify(this.#products, null, "\t"));

        return newProduct;
    };

    getProducts = async () => {
        await this.#loadProducts();

        return this.#products;
    };

    getProductById = async (id) => {
        await this.#loadProducts();

        if (!id || isNaN(id)) {
            throw new Error(`El id es ${id}, cuando tiene que ser un numero`);
        }

        return this.#products.find((p) => p.id == id) ?? console.error(`Not found`);
    };

    updateProduct = async (product) => {
        await this.#loadProducts();

        const existsProduct = this.#products.some((p) => p.id == product.id);

        if (!existsProduct) {
            throw new Error("El producto no existe");
        }

        this.#products = this.#products.map((p) => {
            return p.id == product.id
                ? {
                      id: p.id,
                      title: product?.title ?? p.title,
                      description: product?.description ?? p.description,
                      code: product?.code ?? p.code,
                      price: product?.price ?? p.price,
                      status: product?.status ?? p.status,
                      stock: product?.stock ?? p.stock,
                      category: product?.category ?? p.category,
                      thumbnails: product?.thumbnails
                          ? [
                                ...p.thumbnails,
                                `http://localhost:8080/assets/${product.thumbnails}`
                            ]
                          : [...p.thumbnails]
                  }
                : p;
        });

        await writeFile(this.#path, JSON.stringify(this.#products, null, "\t"));

        return this.#products.filter((p) => p.id == product.id);
    };

    deleteProduct = async (id) => {
        await this.#loadProducts();

        const existsProduct = this.#products.some((p) => p.id == id);
        if (!existsProduct) {
            throw new Error("El producto no existe");
        }

        const product = this.#products.filter((p) => p.id == id);

        this.#products = this.#products.filter((p) => p.id != id);

        await writeFile(this.#path, JSON.stringify(this.#products, null, "\t"));
    };

    #loadProducts = async () => {
        try {
            this.#products = JSON.parse(await readFile(this.#path, "utf-8"));
        } catch {
            this.#products = [];
        }
    };
}
const productManager = new ProductManager();
export default productManager;
