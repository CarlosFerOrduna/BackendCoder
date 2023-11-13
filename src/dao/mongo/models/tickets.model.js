import { format } from 'date-fns'
import { Schema } from 'mongoose'
import { v4 } from 'uuid'

const ticketSchema = new Schema({
    code: { type: String, require: true, unique: true, index: true },
    purchase_datetime: { type: String, require: true },
    amount: { type: Number, require: true },
    purchaser: { type: String, require: true }
})

ticketSchema.pre('save', function () {
    this.code = v4()
    this.purchase_datetime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
})
