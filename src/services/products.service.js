import { ProductModel } from '../DAO/models/products.model.js';

const productService = {
    addProduct: async (product) => {
        try {
            const newProduct = new ProductModel(product);

            await newProduct.validate();

            return await newProduct.save();
        } catch (error) {
            throw new Error(`ERROR: ${error.message}. DETAIL: ${error.errors}`);
        }
    },
    getProducts: async (limit, sort, page, query) => {
        try {
            return await ProductModel.find({}).limit(limit).sort({ price: sort });
        } catch (error) {
            throw new Error(`Error searching products: ${error.message}`);
        }
    },
    getProductById: async (id) => {
        try {
            const product = await ProductModel.findById(id);
            if (!product) {
                throw new Error('The product does not exist');
            }

            return product;
        } catch (error) {
            throw new Error(`Error searching product: ${error.message}`);
        }
    },
    updateProduct: async (pid, product) => {
        const update = {};

        if (product?.title && isNaN(product?.title)) {
            update.title = product?.title;
        }

        if (product?.description && isNaN(product?.description)) {
            update.description = product?.description;
        }

        if (product?.code && isNaN(product?.code)) {
            update.code = product?.code;
        }

        if (product?.price && !isNaN(product?.price)) {
            update.price = product?.price;
        }

        if (product?.status && isNaN(product?.status)) {
            update.status = product?.status;
        }

        if (product?.stock && !isNaN(product?.stock)) {
            update.stock = product?.stock;
        }

        if (product?.category && isNaN(product?.category)) {
            update.category = product?.category;
        }

        if (product?.thumbnails && isNaN(product?.thumbnails)) {
            update.$push = { thumbnails: product?.thumbnail };
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(pid, update, {
            new: true
        });
        if (!updatedProduct) {
            throw new Error('The product does not exist');
        }

        return updatedProduct;
    },
    deleteProduct: async (id) => {
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(id);
            if (!deletedProduct) {
                throw new Error('The product does not exist');
            }

            return deletedProduct;
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
};

export default productService;
