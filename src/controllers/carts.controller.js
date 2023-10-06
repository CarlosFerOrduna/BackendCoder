import CartService from '../services/carts.service.js';

class CartController {
    constructor() {
        this.cartService = new CartService();
    }

    createCart = async (req, res) => {
        try {
            const cartCreated = await this.cartService.createCart();

            return res.status(201).json({
                status: 'success',
                message: 'cart created with success',
                data: cartCreated
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error,
                data: []
            });
        }
    };

    getCartById = async (req, res) => {
        try {
            const { cid } = req.params;

            const cart = await this.cartService.getCartById(cid);

            return res.status(200).json({
                status: 'success',
                message: 'cart found successful',
                data: cart
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error,
                data: []
            });
        }
    };

    getViewCartById = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.cartService.getCartById(cid);

            return res.render('cart', {
                cart: JSON.parse(JSON.stringify(cart)),
                title: 'Cart'
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error,
                data: []
            });
        }
    };

    addProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await this.cartService.addProductInCart(cid, pid);

            return res.status(201).json({
                status: 'success',
                message: 'product added with success',
                data: cart
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error,
                data: []
            });
        }
    };

    updateQuantityById = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cart = await this.cartService.updateQuantityById(cid, pid, quantity);

            return res.status(201).json({
                status: 'success',
                message: 'product added with success',
                data: cart
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error,
                data: []
            });
        }
    };

    addProductsInCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            const cart = await this.cartService.addProductsInCart(cid, products);

            return res.status(201).json({
                status: 'success',
                message: 'product added with success',
                data: cart
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error,
                data: []
            });
        }
    };

    removeProductInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await this.cartService.removeProductInCart(cid, pid);

            return res.status(200).json({
                status: 'success',
                message: 'product removed with success',
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error,
                data: []
            });
        }
    };

    removeAllProductsInCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.cartService.removeAllProductsInCart(cid);

            return res.status(200).json({
                status: 'success',
                message: 'all products removed with success',
                data: cart
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error,
                data: []
            });
        }
    };
}

const cartController = new CartController();

export default cartController;
