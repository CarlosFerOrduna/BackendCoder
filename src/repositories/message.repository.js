import MessageDTO from '../dao/dto/messages.dto.js'

export default class MessageRepository {
    constructor(dao) {
        this.dao = dao
    }

    insertMessage = async (message) => {
        const messageDto = new MessageDTO(message)
        return await this.dao.insertMessage(messageDto)
    }

    getMessages = async () => {
        return await this.dao.getMessages()
    }
}
