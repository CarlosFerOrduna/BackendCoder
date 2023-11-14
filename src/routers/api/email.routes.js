import { createTransport } from 'nodemailer'
import twilio from 'twilio'
import config from '../../config/dotenv.config.js'
import BaseRouter from '../BaseRouter.js'

export default class ApiRouterMailer extends BaseRouter {
    init() {
        this.get('/email', ['admin'], async (req, res) => {
            try {
                const { to } = req.body

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
                    to: to,
                    subject: 'Correo de prueba',
                    html: `<div>
                        <h1>Esto es un test</h1>
                        <p>Hola mundo!</p>
                    </div>`,
                    attachments: []
                })

                return res.status(200).send({
                    status: 'success',
                    result
                })
            } catch (error) {
                console.error(error)
                return res.status(500).send({
                    status: 'error al enviar el email',
                    error
                })
            }
        })
        this.get('/sms', ['admin'], async (req, res) => {
            try {
                const { to } = req.body

                const client = twilio(config.twilioAccountSid, config.twilioAuthToken)

                const result = await client.messages.create({
                    body: 'Esto es un mensaje SMS de prueba',
                    from: config.twilioPhoneNumber,
                    to: to
                })

                return res.status(200).send({
                    status: 'success',
                    result
                })
            } catch (error) {
                console.error(error)
                return res.status(500).send({
                    status: 'error al enviar SMS',
                    error
                })
            }
        })
    }
}
