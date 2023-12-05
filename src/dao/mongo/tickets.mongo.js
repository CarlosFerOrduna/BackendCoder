import CustomError from '../../services/errors/CostumError.js'
import errorCodes from '../../services/errors/enum.errors.js'
import { invalidFieldErrorInfo } from '../../services/errors/info.errors.js'
import ticketModel from './models/tickets.model.js'

export default class Ticket {
    createTicket = async (ticket) => {
        const newTicket = new ticketModel(ticket)
        await newTicket.validate()

        return await newTicket.save()
    }

    getTicketById = async (tid) => {
        const ticket = await ticketModel.findById(tid)
        if (!ticket) {
            CustomError.createError({
                name: 'ticket does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'ticket',
                    type: 'string',
                    value: ticket
                }),
                message: 'Error to get ticket',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return ticket
    }

    searchTicket = async (limit, sort, page, query) => {
        return await ticketModel.paginate(query, {
            limit: limit ?? 10,
            page: page ?? 1,
            sort: { purchase_datetime: sort }
        })
    }

    updateTicket = async (ticket) => {
        const ticketUpdated = await ticketModel.findByIdAndUpdate(ticket._id, ticket, {
            new: true
        })
        if (!ticketUpdated) {
            CustomError.createError({
                name: 'ticket does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'ticketUpdated',
                    type: 'string',
                    value: ticketUpdated
                }),
                message: 'Error to update ticket',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return ticketUpdated
    }

    deleteTicket = async (tid) => {
        const ticketDeleted = await ticketModel.findByIdAndDelete(tid)
        if (!ticketDeleted) {
            CustomError.createError({
                name: 'ticket does not exist',
                cause: invalidFieldErrorInfo({
                    name: 'ticketDeleted',
                    type: 'string',
                    value: ticketDeleted
                }),
                message: 'Error to delete ticket',
                code: errorCodes.DATABASE_ERROR
            })
        }

        return ticketDeleted
    }
}
