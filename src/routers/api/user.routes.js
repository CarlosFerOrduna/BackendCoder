import userController from '../../controllers/users.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ApiRouterUsers extends BaseRouter {
    init() {
        this.post('/login', ['public'], userController.loginApi)
        this.post('/register', ['public'], userController.createUser)
        this.put('/restore', ['public'], userController.updateUser)
        this.get('/current', ['user'], userController.currentApi)
        this.post('/logout', ['user'], userController.logout)
    }
}
