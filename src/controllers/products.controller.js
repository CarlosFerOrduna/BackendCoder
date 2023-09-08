import productService from '../services/products.service.js';

const productController = {
    addProduct: async (req, res) => {
        try {
            const { title, description, code, price, status, stock, category } = req.body;
            const thumbnails = req?.file?.filename;
            const product = await productService.addProduct({
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            });

            return res.status(201).json({
                status: 'success',
                message: 'product created with success',
                data: product
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    },
    getProducts: async (req, res) => {
        try {
            const { limit, page, sort, query } = req.query;
            const products = await productService.getProducts(limit, sort, page, query);

            return res.status(200).json({
                status: 'success',
                message: 'Products found successful',
                data: products
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    },
    getProductById: async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await productService.getProductById(pid);

            return res.status(200).json({
                status: 'success',
                message: 'Product found successful',
                data: product
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, description, code, price, status, stock, category } = req.body;
            const { pid } = req.params;
            const thumbnails = req?.file?.filename;
            const product = await productService.updateProduct(pid, {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            });

            return res.status(200).json({
                status: 'success',
                message: 'product updated with success',
                data: product
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { pid } = req.params;
            await productService.deleteProduct(pid);

            return res.status(204).json({});
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    }
};

export default productController;
