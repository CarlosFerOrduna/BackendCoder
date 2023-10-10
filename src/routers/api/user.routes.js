import userController from '../../controllers/users.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ApiRouterUsers extends BaseRouter {
    init() {
        this.post('/login', ['public'], userController.login)
        this.post('/register', ['public'], userController.createUser)
        this.post('/restore', ['public'], userController.updateUser)
        this.get('/current', ['user'], userController.current)
        this.post('/logout', ['user'], userController.logout)
    }
}
