import { format } from 'date-fns'
import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { v4 } from 'uuid'

const ticketSchema = new Schema({
    code: { type: String, require: true, unique: true, index: true },
    purchase_datetime: { type: String, require: true },
    amount: { type: Number, require: true },
    purchaser: { type: String, require: true }
})

ticketSchema.plugin(paginate)

ticketSchema.pre('save', function () {
    this.code = v4()
    this.purchase_datetime = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
})

const ticketModel = model('tickets', ticketSchema)

export default ticketModel
