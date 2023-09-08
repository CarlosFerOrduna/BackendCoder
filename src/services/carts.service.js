import { CartModel } from '../dao/models/carts.model.js';
import productService from './products.service.js';

const cartService = {
    createCart: async () => {
        return await CartModel.create({});
    },
    getCartById: async (id) => {
        const cart = await CartModel.findById(id);
        if (!cart) {
            throw new Error('The Cart does not exist');
        }

        return cart;
    },
    addProductInCart: async (cid, pid) => {
        const cart = await CartModel.findById(cid);
        if (!cart) {
            throw new Error('Cart does not exist');
        }

        const product = await productService.getProductById(pid);
        if (!product) {
            throw new Error('Product does not exist');
        }

        const existingProductIndex = cart.products.findIndex(
            (p) => p.product && p.product.toString() === pid.toString()
        );

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        return await cart.save();
    }
};

export default cartService;
