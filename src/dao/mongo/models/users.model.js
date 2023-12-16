import { Schema, model } from 'mongoose'

import { createHash } from '../../../utils/bcrypt.util.js'

const userSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, unique: true, index: true },
    age: { type: Number, require: true },
    username: { type: String },
    password: { type: String, require: true },
    rol: { type: String, enum: ['admin', 'user', 'premium'], default: 'user' },
    cart: { type: Schema.Types.ObjectId, ref: 'carts' },
    tickets: [{ type: Schema.Types.ObjectId, ref: 'tickets' }],
    documents: [
        { name: { type: String, require: true }, reference: { type: String, require: true } }
    ],
    lastConnection: { type: Date }
})

userSchema.pre('save', function () {
    if (this.password) this.password = createHash(this.password)
})

const userModel = model('users', userSchema)

export default userModel
