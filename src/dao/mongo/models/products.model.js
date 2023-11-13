import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
    title: { type: String, require: true, index: true },
    description: { type: String, require: true },
    code: { type: String, require: true, unique: true, index: true },
    price: { type: Number, require: true },
    status: { type: Boolean, require: false, default: true },
    stock: { type: Number, require: true },
    category: { type: String, require: true, index: true },
    thumbnails: { type: Array, require: false, default: [] }
})

productSchema.plugin(paginate)

export const productModel = model('products', productSchema)
