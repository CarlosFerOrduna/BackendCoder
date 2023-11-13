export default class MessageDTO {
    constructor(message) {
        this.user = message.user || null
        this.message = message.message || null
    }
}
