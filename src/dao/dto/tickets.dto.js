export default class TicketDTO {
    constructor(ticket) {
        this.code = ticket.code || null
        this.purchase_datetime = ticket.purchase_datetime || null
        this.amount = ticket.amount || null
        this.purchaser = ticket.purchaser || null
    }
}
