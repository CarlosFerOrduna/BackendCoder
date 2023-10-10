import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterUsers extends BaseRouter {
    init() {
        this.get('/login', ['public'], (req, res) => {
            return res.render('login', { title: 'form-login' })
        })

        this.get('/register', ['public'], (req, res) => {
            return res.render('register', { title: 'form-register' })
        })

        this.get('/restore', ['user'], (req, res) => {
            return res.render('restore-password', { title: 'restore-password' })
        })
    }
}
