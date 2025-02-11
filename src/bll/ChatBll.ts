import ChatDal from "../dal/ChatDal";
import ChatModel from "../models/ChatModel";
import MessageModel from "../models/MessageModel";

export default class ChatBll {
    static async validateChat(chat: ChatModel) {
        console.log(chat)

        if (!chat.getId) {
            throw new Error('ID da sala é inválido');
        }
        if (!chat.getOwnerId) {
            throw new Error('ID do criador da sala é inválido');
        }
        if (!chat.getOwnerUsername || chat.getOwnerUsername.length < 1 || chat.getOwnerUsername.length > 15) {
            throw new Error('Nome do criador da sala é inválido');
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
            if (!ownerId) {
                throw new Error('ID do criador da sala é inválido');
            }

            return await ChatDal.getUserChats(ownerId);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getChat(id: string): Promise<ChatModel | null> {
        try {
            if (!id) {
                throw new Error('ID inválido do chat');
            }

            return await ChatDal.getChat(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async getChatInfo(id: string): Promise<ChatModel | null> {
        try {
            if (!id) {
                throw new Error('ID inválido do chat');
            }

            return await ChatDal.getChatInfo(id);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async updateChat(chat: ChatModel): Promise<ChatModel | null> {
        try {
            const chatInfo = await this.getChatInfo(chat.getId);

            if (!chatInfo) {
                throw new Error('Chat não encontrado');
            }

            return await ChatDal.updateChat(chat, chatInfo);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async saveMessage(message: any, chatId: string): Promise<void> {
        const messageRequest = new MessageModel(
            message.message,
            message.senderId,
            message.senderUsername,
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
            if (!messageRequest.getSenderUsername || messageRequest.getSenderUsername.length < 1 || messageRequest.getSenderUsername.length > 15) {
                throw new Error("Nome do remente é inválido");
            }
            if (isNaN(messageRequest.getSentAt.getTime())) {
                throw new Error("Data de envio inválida");
            }

            await ChatDal.saveMessage(messageRequest, chatId);
        } catch (error: any) {
            console.log(`Não foi possível salvar mensagem: ${error.message}`)
            // throw new Error(error.message)
        }
    }
}