import { Schema, model } from 'mongoose';

const CartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const CartSchema = new Schema({
    products: [CartItemSchema]
});

const CartModel = model('carts', CartSchema);

export { CartModel };
