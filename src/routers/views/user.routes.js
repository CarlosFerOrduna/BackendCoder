import userController from '../../controllers/users.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterpublics extends BaseRouter {
    init() {
        this.get('/login', ['public'], (req, res) => {
            return res.render('login', { title: 'form-login' })
        })
        this.get('/register', ['public'], (req, res) => {
            return res.render('register', { title: 'form-register' })
        })
        this.get('/restore/:token', ['public'], userController.restorePassword)
        this.get('/restore', ['public'], (req, res) => {
            return res.render('restore-mailer', { title: 'restore-password' })
        })
        this.get('/current', ['user', 'premium'], userController.currentViews)
        this.get('/logout', ['user', 'premium'], userController.logoutViews)
        this.get('/delete/:uid', ['admin'], (req, res) => {
            const { uid } = req.params
            return res.render('user-delete', { uid })
        })
        this.get('/update/:uid', ['admin'], userController.getUserUpdateViews)
        this.get('/:uid', ['admin'], userController.getUserViews)
        this.get('/', ['admin'], userController.getUsersViews)
        this.post('/login', ['public'], userController.loginViews)
        this.post('/register', ['public'], userController.registerViews)
        this.post('/restore', ['public'], userController.restoreMailer)
        this.post('/verify', ['public'], userController.verify)
        this.post('/update/:uid', ['admin'], userController.updateUserViews)
        this.post('/delete/:uid', ['admin'], userController.deleteUserViews)
    }
}
