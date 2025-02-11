import { Request, Response } from "express";
import ChatBll from "../bll/ChatBll";
import ChatModel from "../models/ChatModel";
import MessageModel from "../models/MessageModel";

export default class ChatController {
    static async create(req: Request, res: Response) {
        const chat = new ChatModel(
            req.body.chat.id,
            req.body.chat.ownerId,
            req.body.chat.ownerUsername,
            new Date(req.body.chat.creation)
        )

        try {
            await ChatBll.validateChat(chat);

            res.status(204).send({
                // success: true,
                // code: res.statusCode
            });
        } catch (error: any) {
            console.log(`Não foi possível criar chat: ${error.message}`);
            switch (error.message) {
                case "ID da sala é inválido":
                case "ID do criador da sala é inválido":
                case "Data de criação inválida":
                case "Chat já existente":
                    res.status(400).send({
                        success: false,
                        code: res.statusCode,
                        message: error.message
                    });
                    break;

                default:
                    res.status(500).send({
                        success: false,
                        code: res.statusCode,
                        error: error.message
                    });
                    break;
            }
        }
    }

    static async getUserChats(req: Request, res: Response) {
        const ownerId: string = req.params.ownerId;

        try {
            const chats: ChatModel[] = await ChatBll.getUserChats(ownerId);

            if (chats.length === 0) {
                res.status(200).send({
                    success: true,
                    code: res.statusCode,
                    message: "Esse usuário não possui conversas",
                    chats: []
                });
                return;
            }

            res.status(200).send({
                success: true,
                code: res.statusCode,
                chats: chats
            });
            return;
        } catch (error: any) {
            console.log(`Erro ao buscar conversas do usuário: ${error.message}`);

            switch (error.message) {
                case "ID do criador da sala é inválido":
                    res.status(404).send({
                        success: true,
                        code: res.statusCode,
                        message: error.message,
                        chats: []
                    });
                    break;

                default:
                    res.status(500).send({
                        success: false,
                        code: res.statusCode,
                        error: error.message,
                        chats: []
                    });
                    break;
            }

        }
    }

    static async getChat(req: Request, res: Response) {
        const id: string = req.params.id;

        try {
            const chat: ChatModel | null = await ChatBll.getChat(id);

            if (!chat) {
                res.status(200).send({
                    success: true,
                    code: res.statusCode,
                    message: "Chat não encontrado",
                    chat: null
                })
                return;
            }

            res.status(200).send({
                success: true,
                code: res.statusCode,
                chat: chat
            });
            return;
        } catch (error: any) {
            console.log(`Erro ao buscar chat: ${error.message}`);
            switch (error.message) {
                case "ID inválido do chat":
                    res.status(404).send({
                        success: true,
                        code: res.statusCode,
                        message: error.message,
                        chat: null
                    })
                    break;

                default:
                    res.status(500).send({
                        success: false,
                        code: res.statusCode,
                        error: error.message,
                        chat: null
                    });
                    break;
            }
        }
    }

    static async getChatInfo(req: Request, res: Response) {
        const id: string = req.params.id;

        try {
            const chat: ChatModel | null = await ChatBll.getChatInfo(id);

            if (!chat) {
                res.status(200).send({
                    success: true,
                    code: res.statusCode,
                    message: "Chat não encontrado",
                    chat: chat
                })
                return;
            }

            res.status(200).send({
                success: true,
                code: res.statusCode,
                chat: chat
            });
            return;
        } catch (error: any) {
            console.log(`Erro ao buscar chat: ${error.message}`);
            switch (error.message) {
                case "ID inválido do chat":
                    res.status(404).send({
                        success: true,
                        code: res.statusCode,
                        message: error.message,
                        chat: null
                    })
                    break;

                default:
                    res.status(500).send({
                        success: false,
                        code: res.statusCode,
                        error: error.message,
                        chat: null
                    });
                    break;
            }
        }
    }

    static async updateChat(req: Request, res: Response) {
        const chat = new ChatModel(
            req.body.id,
            req.body.ownerId,
            req.body.ownerUsername,
            req.body.creation,
            req.body.guestId,
            req.body.guestUsername
        )

        try {
            const updatedChat: ChatModel | null = await ChatBll.updateChat(chat);

            res.status(200).send({
                success: true,
                code: res.statusCode,
                chat: updatedChat
            });
            return;
        } catch (error: any) {
            console.log(`Erro ao atualizar chat: ${error.menssage}`);

            switch (error.message) {
                case "Chat não encontrado":
                case "ID da sala é inválido":
                case "ID do criador da sala é inválido":
                case "Data de criação inválida":
                    res.status(404).send({
                        success: false,
                        code: res.statusCode,
                        message: error.message,
                        chat: null
                    });
                    break;

                default:
                    res.status(500).send({
                        success: false,
                        code: res.statusCode,
                        error: error.message
                    });
                    break;
            }
        }
    }

    static async saveMessage(req: Request, res: Response) {
        const message = new MessageModel(
            req.body.message.message,
            req.body.message.senderId,
            req.body.message.senderUsername,
            new Date(req.body.message.sentAt)
        )

        const chatId: string = req.body.id

        try {
            await ChatBll.saveMessage(message, chatId);

            res.status(204).send({
                // success: true,
                // code: res.statusCode
            });
            return;
        } catch (error: any) {
            console.log(`Não foi possível salvar mensagem: ${error.message}`)
            switch (error.message) {
                case "Chat não encontrado":
                case "Mensagem inválida":
                case "ID do remente é inválido":
                case "Nome do remente é inválido":
                case "Data de envio inválida":
                    res.status(404).send({
                        success: false,
                        code: res.statusCode,
                        error: error.message
                    });
                    break;

                default:
                    res.status(500).send({
                        success: false,
                        code: res.statusCode,
                        error: error.message
                    });
                    break;
            }
        }
    }
}