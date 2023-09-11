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
            const { limit, page, sort, status, category } = req.query;
            const sortCase = { asc: 1, desc: -1 };

            let query = {};
            if (status) query.status = status;
            if (category) query.category = category;

            const response = await productService.getProducts(
                limit,
                sortCase[sort],
                page,
                query
            );

            return res.status(200).json({
                status: 'success',
                payload: response.docs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: `http://localhost:8080/api/products/?page=${response.prevPage}`,
                nextLink: `http://localhost:8080/api/products/?page=${response.nextPage}`
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
