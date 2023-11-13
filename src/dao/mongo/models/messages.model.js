import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const messageSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true }
})

messageSchema.plugin(paginate)

export const MessageModel = model('messages', messageSchema)
