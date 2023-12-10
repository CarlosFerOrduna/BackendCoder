import userController from '../../controllers/users.controller.js'
import BaseRouter from '../BaseRouter.js'

export default class ViewsRouterpublics extends BaseRouter {
    init() {
        this.get('/login', ['public'], (req, res) =>
            res.render('login', { title: 'form-login' })
        )
        this.get('/register', ['public'], (req, res) =>
            res.render('register', { title: 'form-register' })
        )
        this.get('/restore', ['public'], (req, res) =>
            res.render('restore-password', { title: 'restore-password' })
        )
        this.get('/current', ['user'], userController.currentViews)
        this.get('/logout', ['user'], userController.logout)
        this.post('/login', ['public'], userController.loginViews)
        this.post('/register', ['public'], userController.registerViews)
        this.post('/restore', ['public'], async (req, res) => {
            try {
                const { email } = req.params
                const recovery = ''

                const transport = createTransport({
                    service: 'gmail',
                    port: 587,
                    auth: {
                        user: config.emailUser,
                        pass: config.emailPass
                    }
                })

                const result = await transport.sendMail({
                    from: config.emailUser,
                    to: email,
                    subject: 'Restaurar contraseña',
                    html: ` <div>
                                <h2>Este es el codigo para restauración de contraseña</h2>
                                <p>${recovery}</p>
                            </div>`,
                    attachments: []
                })

                return res.status(200).send({
                    status: 'success',
                    result
                })
            } catch (error) {
                return res.status(500).send({
                    status: 'error al enviar el email',
                    error
                })
            }
        })
    }
}
