import { MessageModel } from './models/messages.model.js'

export default class Message {
    insertMessage = async (message) => {
        const newMessage = new MessageModel({
            user: message.user,
            message: message.message
        })

        await newMessage.validate()

        return await newMessage.save()
    }

    getMessages = async () => {
        return await MessageModel.find({})
    }
}
