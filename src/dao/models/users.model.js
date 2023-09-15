import { Schema, model } from 'mongoose';

const userModel = model(
    'users',
    new Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        age: { type: Number, required: true },
        password: { type: String, required: true },
        rol: { type: String, enum: ['admin', 'user'] }
    })
);

export default userModel;
