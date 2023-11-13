import TicketDTO from '../dao/dto/tickets.dto.js'

export default class TicketRepository {
    constructor(dao) {
        this.dao = dao
    }

    createTicket = async (ticket) => {
        const ticketDto = new TicketDTO(ticket)
        return await this.dao.createTicket(ticketDto)
    }

    getTicketById = async (tid) => {
        return await this.dao.getTicketById(tid)
    }

    searchTicket = async (limit, sort, page, query) => {
        return await this.dao.searchTicket(limit, sort, page, query)
    }

    updateTicket = async (ticket) => {
        return await this.dao.updateTicket(ticket)
    }

    deleteTicket = async (tid) => {
        return await this.dao.deleteTicket(tid)
    }
}
