import { messageService } from '../repositories/index.js'

class MessagesControlles {
    getMessages = async (req, res) => {
        const messages = await messageService.getMessages()

        return res.render('chat', {
            title: 'ChatSocket',
            messages
        })
    }
}

const messagesControlles = new MessagesControlles()

export default messagesControlles
