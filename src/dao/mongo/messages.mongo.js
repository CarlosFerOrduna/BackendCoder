import { MessageModel } from './models/messages.model.js'

export default class Message {
    insertMessage = async (message) => {
        try {
            const newMessage = new MessageModel({
                user: message.user,
                message: message.message
            })

            await newMessage.validate()

            return await newMessage.save()
        } catch (error) {
            throw new Error('insertMessage: ' + error)
        }
    }

    getMessages = async () => {
        try {
            return await MessageModel.find({})
        } catch (error) {
            throw new Error('getMessages: ' + error)
        }
    }
}
