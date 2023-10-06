import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ]
    }
})

export const cartModel = model('carts', cartSchema)
