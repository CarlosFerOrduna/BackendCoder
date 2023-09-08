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
    }
};

export default cartController;
