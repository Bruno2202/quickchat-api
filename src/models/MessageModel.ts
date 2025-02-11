export default class MessageModel {
    private id?: string;
    private message: string;
    private senderId: string;
    private senderUsername: string;
    private sentAt: Date;

    constructor(message: string, senderId: string, senderUsername: string, sentAt: Date, id?: string) {
        this.message = message;
        this.senderId = senderId;
        this.senderUsername = senderUsername;
        this.sentAt = sentAt;
        this.id = id;
    }

    get getId(): string | undefined { return this.id; }
    get getMessage(): string { return this.message; }
    get getSenderId(): string { return this.senderId; }
    get getSenderUsername(): string { return this.senderUsername; }
    get getSentAt(): Date { return this.sentAt; }
}