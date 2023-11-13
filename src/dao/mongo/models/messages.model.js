import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const messageSchema = new Schema({
    user: { type: String, require: true },
    message: { type: String, require: true }
})

messageSchema.plugin(paginate)

export const MessageModel = model('messages', messageSchema)
