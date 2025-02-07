import ChatModel from "./ChatModel";

export class UserModel {
    private id: string;
    private username: string;
    private chats?: ChatModel[];

    constructor(id: string, username: string, chats?: ChatModel[]) {
        this.id = id;
        this.username = username;
        this.chats = chats;
    }
    
    get getId(): string { return this.id; }
    get getUsername(): string { return this.username; }
    get getChats(): ChatModel[] | undefined { return this.chats; }

    set setId(id: string) { this.id = id; }
    set setUsername(username: string) { this.username = username; }
    set setChats(chats: ChatModel[]) { this.chats = chats; }
} 