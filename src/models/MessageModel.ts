export default class MessageModel {
    private id?: string;
    private message: string;
    private senderId: string;
    private sentAt: Date;

    constructor(message: string, senderId: string, sentAt: Date, id?: string) {
        this.message = message;
        this.senderId = senderId;
        this.sentAt = sentAt;
        this.id = id;
    }

    get getId(): string | undefined { return this.id; }
    get getMessage(): string { return this.message; }
    get getSenderId(): string { return this.senderId; }
    get getSentAt(): Date { return this.sentAt; }
}