import { Schema, model } from "mongoose";

export const MessageModel = model(
    "messages",
    new Schema({
        user: { type: String, required: true },
        message: { type: String, required: true }
    })
);
