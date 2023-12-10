import ticketController from '../../controllers/tickets.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterTickets extends BaseRouter {
    init() {
        this.get('/:tid', ['user'], ticketController.getTicketById)
        this.get('/', ['user'], ticketController.searchTickets)
    }
}
