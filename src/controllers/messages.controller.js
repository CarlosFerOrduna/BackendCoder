import { messageService } from '../repositories/index.js'

class MessagesControlles {
    constructor() {
        this.messageService = messageService
    }

    getMessages = async (req, res) => {
        try {
            const messages = await this.messageService.getMessages()

            return res.render('chat', {
                title: 'ChatSocket',
                messages
            })
        } catch {
            return res.status(400).json({
                status: 'error',
                message: error.toString(),
                data: []
            })
        }
    }
}

const messagesControlles = new MessagesControlles()

export default messagesControlles
