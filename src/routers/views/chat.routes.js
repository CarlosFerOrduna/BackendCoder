import messagesControlles from '../../controllers/messages.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterChats extends BaseRouter {
    init() {
        this.get('/', ['user', 'premium'], messagesControlles.getMessages)
    }
}
