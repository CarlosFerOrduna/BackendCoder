import { Schema, model } from 'mongoose';
import bcriptWrapper from '../../utils/bcript.utils.js';

const userSchema = new Schema({
    firstName: { type: String, required: true, minLength: 3 },
    lastName: { type: String, required: true, minLength: 3 },
    email: { type: String, required: true, unique: true, index: true },
    age: { type: Number, required: true, min: 0 },
    password: { type: String, required: true, minLength: 3 },
    rol: { type: String, enum: ['admin', 'user'] }
});

userSchema.pre('save', function () {
    this.password = bcriptWrapper.createHash(this.password);
});

const userModel = model('users', userSchema);

export default userModel;
