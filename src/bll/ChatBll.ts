import ChatDal from "../dal/ChatDal";
import ChatModel from "../models/ChatModel";
import MessageModel from "../models/MessageModel";

export default class ChatBll {
    static async validateChat(chat: ChatModel) {
        if (!chat.getId) {
            throw new Error('ID da sala é inválido');
        }
        if (!chat.getOwnerId) {
            throw new Error('ID do criador da sala é inválido');
        }
        if (isNaN(chat.getCreation.getTime())) {
            throw new Error('Data de criação inválida');
        }
        if (await this.getChat(chat.getId)) {
            throw new Error('Chat já existente');
        }

        try {
            await ChatDal.createChat(chat);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getUserChats(ownerId: string): Promise<ChatModel[]> {
        try {
            return await ChatDal.getUserChats(ownerId);
        } catch (error) {
            throw Error;
        }
    }

    static async getChat(id: string): Promise<ChatModel | null> {
        try {
            return await ChatDal.getChat(id);
        } catch (error) {
            throw Error;
        }
    }

    static async updateChat(chat: ChatModel): Promise<ChatModel | null> {
        try {
            if (!await this.getChat(chat.getId)) {
                return null;
            }

            return await ChatDal.updateChat(chat);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async saveMessage(message: any, chatId: string): Promise<void> {
        const messageRequest = new MessageModel(
            message.message,
            message.senderId,
            new Date(message.sentAt)
        );

        try {
            if (!await ChatBll.getChat(chatId)) {
                throw new Error("Chat não encontrado");
            }
            if (!messageRequest.getMessage) {
                throw new Error("Mensagem inválida");
            }
            if (!messageRequest.getSenderId) {
                throw new Error("ID do remente é inválido");
            }
            if (isNaN(messageRequest.getSentAt.getTime())) {
                throw new Error("Data de envio inválida");
            }

            await ChatDal.saveMessage(messageRequest, chatId);
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}