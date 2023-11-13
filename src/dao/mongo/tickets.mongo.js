import ticketModel from './models/tickets.model.js'

export default class Ticket {
    createTicket = async (ticket) => {
        try {
            const newTicket = new ticketModel(ticket)
            await newTicket.validate()

            return await newTicket.save()
        } catch (error) {
            throw new Error('createTicket: ' + error)
        }
    }

    getTicketById = async (tid) => {
        try {
            const ticket = await ticketModel.findById(tid)
            if (!ticket) throw new Error('ticket not exists')

            return ticket
        } catch (error) {
            throw new Error('getTicketById: ' + error)
        }
    }

    searchTicket = async (limit, sort, page, query) => {
        try {
            return await ticketModel.paginate(query, {
                limit: limit ?? 10,
                page: page ?? 1,
                sort: { purchase_datetime: sort }
            })
        } catch (error) {
            throw new Error('searchTicket:' + error)
        }
    }

    updateTicket = async (ticket) => {
        try {
            const ticketUpdated = await ticketModel.findByIdAndUpdate(ticket._id, ticket, {
                new: true
            })
            if (!ticketUpdated) throw new Error('ticket not exists')

            return ticketUpdated
        } catch (error) {
            throw new Error('updateTicket: ' + error)
        }
    }

    deleteTicket = async (tid) => {
        try {
            const ticketDeleted = await ticketModel.findByIdAndDelete(tid)
            if (!ticketDeleted) throw new Error('ticket not exists')

            return ticketDeleted
        } catch (error) {
            throw new Error('deleteTicket: ' + error)
        }
    }
}
