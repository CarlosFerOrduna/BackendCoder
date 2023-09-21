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

            const result = await productService.getProducts(
                limit,
                sortCase[sort],
                page,
                query
            );

            return res.status(200).json({
                status: 'success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: `http://localhost:8080/api/products/?page=${result.prevPage}`,
                nextLink: `http://localhost:8080/api/products/?page=${result.nextPage}`
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    },
    getProductsForViews: async (req, res) => {
        try {
            const { limit, page, sort, status, category } = req.query;
            const sortCase = { asc: 1, desc: -1 };

            let query = {};
            if (status) query.status = status;
            if (category) query.category = category;

            const result = await productService.getProducts(
                limit,
                sortCase[sort],
                page,
                query
            );

            return res.render('products', {
                payload: JSON.parse(JSON.stringify(result.docs)),
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: `http://localhost:8080/views/products/?page=${result.prevPage}`,
                nextLink: `http://localhost:8080/views/products/?page=${result.nextPage}`,
                title: 'Products',
                firstName: req.session.firstName,
                userLog: req.session.firstName ? true : false
            });
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.message,
                data: {}
            });
        }
    },
    getProductByIdForViews: async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await productService.getProductById(pid);

            return res.render('product', {
                product: JSON.parse(JSON.stringify(product)),
                title: `Product: ${product.title}`
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
