import { cartModel } from '../dao/models/carts.model.js';
import productService from './products.service.js';

export default class CartService {
    createCart = async () => {
        try {
            return await cartModel.create({});
        } catch (error) {
            throw new Error('createCart: ' + error);
        }
    };

    getCartById = async (id) => {
        try {
            const cart = await cartModel.findById(id).populate('products.product');
            if (!cart) {
                throw new Error('The Cart does not exist');
            }

            return cart;
        } catch (error) {
            throw new Error('getCartById: ' + error);
        }
    };

    addProductInCart = async (cid, pid) => {
        try {
            const cart = await cartModel.findById(cid);
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
        } catch (error) {
            throw new Error('addProductInCart: ' + error);
        }
    };

    updateQuantityById = async (cid, pid, quantity) => {
        try {
            const result = await cartModel.updateOne(
                { _id: cid, 'products.product': pid },
                { $set: { 'products.$.quantity': quantity } }
            );

            if (result.modifiedCount < 1) {
                throw new Error('Something went wrong');
            }

            return await cartModel.findById(cid);
        } catch (error) {
            throw new Error('updateQuantityById: ' + error);
        }
    };

    addProductsInCart = async (cid, products) => {
        try {
            return await cartModel.findByIdAndUpdate(cid, {
                $set: { products }
            });
        } catch (error) {
            throw new Error('addProductsInCart: ' + error);
        }
    };

    removeProductInCart = async (cid, pid) => {
        try {
            let cart = await cartModel.findById(cid);
            if (!cart) {
                throw new Error('Cart does not exist');
            }

            return await cartModel.findByIdAndUpdate(cid, {
                $pull: { products: { product: pid } }
            });
        } catch (error) {
            throw new Error('removeProductInCart: ' + error);
        }
    };

    removeAllProductsInCart = async (cid) => {
        try {
            let cart = await cartModel.findById(cid);
            if (!cart) {
                throw new Error('Cart does not exist');
            }

            return await cartModel.findByIdAndUpdate(cid, {
                $set: { products: [] }
            });
        } catch (error) {
            throw new Error('removeProductInCart: ' + error);
        }
    };
}
