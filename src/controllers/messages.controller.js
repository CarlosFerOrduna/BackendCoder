import MessageService from '../services/messages.service.js'

class MessagesControlles {
    constructor() {
        this.messageService = new MessageService()
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
                message: error,
                data: []
            })
        }
    }
}

const messagesControlles = new MessagesControlles()

export default messagesControlles
