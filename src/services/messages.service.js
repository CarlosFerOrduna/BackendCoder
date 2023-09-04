import { MessageModel } from "../dao/models/messages.model.js";

class MessageService {
    insertMessage = async (message) => {
        try {
            const newMessage = new MessageModel({
                user: message.user,
                message: message.message
            });

            await newMessage.validate();

            return await newMessage.save();
        } catch (error) {
            throw new Error(`ERROR: ${error.message}. DETAIL: ${error.errors}`);
        }
    };

    getMessages = async () => {
        try {
            return await MessageModel.find({});
        } catch (error) {
            throw new Error(`Error searching Messages: ${error.message}`);
        }
    };
}

const messageService = new MessageService();
export default messageService;
