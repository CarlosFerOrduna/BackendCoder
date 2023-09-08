import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const productSchema = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true, index: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: false, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, index: true },
    thumbnails: { type: Array, required: false, default: [] }
});

productSchema.plugin(paginate);

export const productModel = model('products', productSchema);
