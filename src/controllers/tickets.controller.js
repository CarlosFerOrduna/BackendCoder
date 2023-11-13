import { isDate } from 'date-fns'
import { ticketService } from '../repositories/index.js'

class TicketController {
    constructor() {
        this.ticketService = ticketService
    }

    getTicketById = async (req, res) => {
        try {
            const { tid } = req.params
            if (!tid || !isNaN(tid)) throw new Error('tid not valid')

            const result = await this.ticketService.getTicketById(tid)

            return res.status(200).json({
                status: 'success',
                message: 'ticket found with success',
                data: result
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                payload: error
            })
        }
    }

    searchTickets = async (req, res) => {
        try {
            const { limit, page, sort, code, purchase_datetime, amount, purchaser } = req.query

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
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                payload: error
            })
        }
    }

    updateTicket = async (req, res) => {
        try {
            const { code, purchase_datetime, amount, purchaser } = req.body
            const { tid } = req.params
            if (!tid || isNaN(tid)) throw new Error('pid is not valid')

            const update = {}
            if (code && isNaN(code)) update.code = code
            if (purchase_datetime && isDate(purchase_datetime))
                update.purchase_datetime = purchase_datetime
            if (amount && !isNaN(amount)) update.amount = amount
            if (purchaser && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(purchaser))
                update.purchaser = purchaser

            const data = await this.ticketService.updateTicket(update)

            return res.status(200).json({
                status: 'success',
                message: 'ticket updated with success',
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                payload: error
            })
        }
    }

    deleteTicket = async (req, res) => {
        try {
            const { pid: tid } = req.params
            if (!tid || isNaN(tid)) throw new Error('tid is not valid')

            await this.ticketService.deleteTicket(tid)

            return res.status(204).send({})
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                payload: error
            })
        }
    }
}

const ticketController = new TicketController()

export default ticketController
