import ticketController from '../../controllers/tickets.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterTickets extends BaseRouter {
    init() {
        this.get('/:tid', ['user', 'premium'], ticketController.getTicketById)
        this.get('/', ['user', 'premium'], ticketController.searchTickets)
    }
}
