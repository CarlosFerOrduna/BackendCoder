import { isDate } from 'date-fns'
import { ticketService } from '../repositories/index.js'
import CustomError from '../services/errors/CostumError.js'
import errorCodes from '../services/errors/enum.errors.js'
import { invalidFieldErrorInfo } from '../services/errors/info.errors.js'

class TicketController {
    getTicketById = async (req, res) => {
        const { tid } = req.params
        if (!tid || !isNaN(tid)) {
            CustomError.createError({
                name: 'tid is not valid',
                cause: invalidFieldErrorInfo({ name: 'tid', type: 'string', value: tid }),
                message: 'Error to get ticket',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const result = await ticketService.getTicketById(tid)

        return res.status(200).json({
            status: 'success',
            message: 'ticket found with success',
            data: result
        })
    }

    searchTickets = async (req, res) => {
        const { limit, page, sort, code, purchase_datetime, amount, purchaser } = req.query
        const sortCase = { asc: 1, desc: -1 }

        let query = {}
        if (code) query.code = code
        if (purchase_datetime) query.purchase_datetime = purchase_datetime
        if (amount) query.amount = amount
        if (purchaser) query.purchaser = purchaser

        const result = await this.productService.getProducts(
            limit,
            sortCase[sort],
            page,
            query
        )

        return res.status(200).json({
            status: 'success',
            message: 'tickets found with success',
            payload: result
        })
    }

    updateTicket = async (req, res) => {
        const { code, purchase_datetime, amount, purchaser } = req.body
        const { tid } = req.params
        if (!tid || !isNaN(tid)) {
            CustomError.createError({
                name: 'tid is not valid',
                cause: invalidFieldErrorInfo({ name: 'tid', type: 'string', value: tid }),
                message: 'Error to update ticket',
                code: errorCodes.INVALID_TYPES_ERROR
            })
        }

        const update = {}
        if (code && isNaN(code)) update.code = code
        if (purchase_datetime && isDate(purchase_datetime))
            update.purchase_datetime = purchase_datetime
        if (amount && !isNaN(amount)) update.amount = amount
        if (purchaser && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(purchaser))
            update.purchaser = purchaser

        const data = await ticketService.updateTicket(update)

        return res.status(200).json({
            status: 'success',
            message: 'ticket updated with success',
            data
        })
    }

    deleteTicket = async (req, res) => {
        const { pid: tid } = req.params
        if (!tid || isNaN(tid)) throw new Error('tid is not valid')

        await ticketService.deleteTicket(tid)

        return res.status(204).send({})
    }
}

const ticketController = new TicketController()

export default ticketController
