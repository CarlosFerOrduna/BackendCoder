import messageService from '../services/messages.service.js';

const messagesControlles = {
    getMessages: async (req, res) => {
        try {
            const messages = messageService.getMessages();

            return res.render('chat', {
                title: 'ChatSocket',
                messages
            });
        } catch {
            return res.render('bad-request', {});
        }
    }
};

export default messagesControlles;
