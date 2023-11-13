import { Schema, model } from 'mongoose'
import { createHash } from '../../../utils/bcrypt.util.js'

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, index: true },
    age: { type: Number },
    username: { type: String },
    password: { type: String },
    rol: { type: String, enum: ['admin', 'user'] }
})

userSchema.pre('save', function () {
    if (this.password) {
        this.password = createHash(this.password)
    }
})

const userModel = model('users', userSchema)

export default userModel
