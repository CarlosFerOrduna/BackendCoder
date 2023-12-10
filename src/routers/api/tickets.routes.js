import ticketController from '../../controllers/tickets.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ApiRouterTickets extends BaseRouter {
    init() {
        this.get('/', ['user'], ticketController.searchTickets)
        this.get('/:tid', ['user'], ticketController.getTicketById)
        this.put('/:tid', ['admin'], ticketController.updateTicket)
        this.delete('/:tid', ['admin'], ticketController.deleteTicket)
    }
}
