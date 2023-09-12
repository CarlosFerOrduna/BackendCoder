import cartService from '../services/carts.service.js';

const cartController = {
    createCart: async (req, res) => {
        const cartCreated = await cartService.createCart();

        return res.status(201).json({
            status: 'success',
            message: 'cart created with success',
            data: cartCreated
        });
    },
    getCartById: async (req, res) => {
        try {
            const { cid } = req.params;

            const cart = await cartService.getCartById(cid);

            res.status(200).json({
                status: 'success',
                message: 'cart found successful',
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            });
        }
    },
    getViewCartById: async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartById(cid);

            return res.render('cart', {
                cart: JSON.parse(JSON.stringify(cart)),
                title: 'Cart'
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            });
        }
    },
    addProductInCart: async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await cartService.addProductInCart(cid, pid);

            return res.status(201).json({
                status: 'success',
                message: 'product added with success',
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            });
        }
    },
    updateQuantityById: async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cart = await cartService.updateQuantityById(cid, pid, quantity);

            return res.status(201).json({
                status: 'success',
                message: 'product added with success',
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            });
        }
    },
    AddProductsInCart: async (req, res) => {
        try {
            const { cid } = req.params;
            const { products } = req.body;
            const cart = await cartService.AddProductsInCart(cid, products);

            return res.status(201).json({
                status: 'success',
                message: 'product added with success',
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            });
        }
    },
    removeProductInCart: async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await cartService.removeProductInCart(cid, pid);

            return res.status(200).json({
                status: 'success',
                message: 'product removed with success',
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            });
        }
    },
    removeAllProductsInCart: async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await cartService.removeAllProductsInCart(cid);

            return res.status(200).json({
                status: 'success',
                message: 'all products removed with success',
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message,
                data: []
            });
        }
    }
};

export default cartController;
