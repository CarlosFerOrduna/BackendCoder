import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstName: { type: String, required: true, minLength: 3 },
    lastName: { type: String, required: true, minLength: 3 },
    email: { type: String, required: true, unique: true, index: true },
    age: { type: Number, required: true, min: 0 },
    password: { type: String, required: true, minLength: 3 },
    rol: { type: String, enum: ['admin', 'user'] }
});

userSchema.pre('save', function () {
    console.log(this);
});

const userModel = model('users', userSchema);

export default userModel;
