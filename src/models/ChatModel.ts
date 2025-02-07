import MessageModel from "./MessageModel";

export default class ChatModel {
    private id: string;
    private ownerId: string;
    private guestId?: string;
    private creation: Date;
    private messages?: MessageModel[];

    constructor(id: string, ownerId: string, creation: Date, guestId?: string, messages?: MessageModel[]) {
        this.id = id;
        this.ownerId = ownerId;
        this.guestId = guestId;
        this.creation = typeof creation === 'string' ? new Date(creation) : creation;
        this.messages = messages;
    }

    get getId(): string { return this.id; }
    get getOwnerId(): string { return this.ownerId; }
    get getGuestId(): string | undefined { return this.guestId; }
    get getCreation(): Date { return this.creation; }
    get getMessages(): MessageModel[] | undefined { return this.messages; }
}