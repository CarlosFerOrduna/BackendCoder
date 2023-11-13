import ticketController from '../../controllers/tickets.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ApiRouterTickets extends BaseRouter {
    init() {
        this.get('/', ['public'], ticketController.searchTickets)
        this.get('/:tid', ['public'], ticketController.getTicketById)
        this.put('/:tid', ['admin'], ticketController.updateTicket)
        this.delete('/:tid', ['admin'], ticketController.deleteTicket)
    }
}
