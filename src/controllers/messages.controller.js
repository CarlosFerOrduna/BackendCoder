import messageService from '../services/messages.service.js';

class MessagesControlles {
    constructor() {}

    getMessages = async (req, res) => {
        try {
            const messages = messageService.getMessages();

            return res.render('chat', {
                title: 'ChatSocket',
                messages
            });
        } catch {
            return res.render('bad-request', {});
        }
    };
}

const messagesControlles = new MessagesControlles();

export default messagesControlles;
