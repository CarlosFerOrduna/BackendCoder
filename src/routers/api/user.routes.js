import userController from '../../controllers/users.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ApiRouterUsers extends BaseRouter {
    init() {
        this.get('/current', ['user', 'premium'], userController.currentApi)
        this.get('/', ['admin'], userController.searchUsers)
        this.post('/:uid/documents', ['user', 'premium', 'admin'], userController.addDocuments)
        this.post('/login', ['public'], userController.loginApi)
        this.post('/register', ['public'], userController.registerApi)
        this.post('/restore', ['public'], userController.updateUser)
        this.post('/logout', ['user', 'premium', 'admin'], userController.logoutApi)
        this.put('/premium/:uid', ['admin'], userController.changeRol)
        this.delete('/', ['admin'], userController.deleteInactiveUsers)
    }
}
