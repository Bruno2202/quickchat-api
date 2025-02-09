import { db } from "../config/firebaseConfig";
import { collection, query, where, getDocs, setDoc, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import ChatModel from "../models/ChatModel";
import MessageModel from "../models/MessageModel";

export default class ChatDal {
    static async createChat(chat: ChatModel): Promise<boolean> {
        try {
            await setDoc(doc(db, "chats", chat.getId), {
                ownerId: chat.getOwnerId,
                creation: chat.getCreation,
                guestId: chat.getGuestId ? chat.getGuestId : ""
            });

            const collectionRef = collection(db, `chats/${chat.getId}/messages`);
            const docRef = doc(collectionRef, "alert");
            await setDoc(docRef, {
                message: "Lembre-se de manter o respeito e a educação durante a conversa. Evite compartilhar informações pessoais e seja cordial com todos.",
                sentAt: chat.getCreation
            });

            console.log(`Chat criado por ${chat.getOwnerId}`);
            return true;
        } catch (error) {
            console.error("Erro ao criar chat:", error);
            return false;
        }
    }

    static async getUserChats(ownerId: string): Promise<ChatModel[]> {
        try {
            const q = query(
                collection(db, "chats"),
                where("ownerId", "==", ownerId)
            );
            const querySnapshot = await getDocs(q);
            const chats: ChatModel[] = [];

            querySnapshot.forEach((doc) => {
                const chatData = doc.data();
                const date = new Date(chatData.creation.seconds * 1000);

                const chat = new ChatModel(
                    doc.id,
                    chatData.ownerId,
                    date,
                    chatData.guestId,
                );
                chats.push(chat);
            });

            return chats;
        } catch (error) {
            console.error("Erro ao buscar chat(s) do usuário:", error);
            return [];
        }
    }

    static async getChat(id: string): Promise<ChatModel | null> {
        try {
            const docRef = doc(db, "chats", id);
            const docSnapshot = await getDoc(docRef);
            const chat = docSnapshot.data();

            if (!chat) {
                return null;
            }

            const messagesRef = collection(db, `chats/${id}/messages`);
            const messagesSnapshot = await getDocs(messagesRef);
            const messages: MessageModel[] = messagesSnapshot.docs.map((doc): MessageModel => {
                return new MessageModel(
                    doc.data().message,
                    doc.data().senderId,
                    new Date(doc.data().sentAt * 1000),
                    doc.id
                );
            });

            if (chat) {
                const date = new Date(chat.creation.seconds * 1000);

                return new ChatModel(
                    docSnapshot.id,
                    chat.ownerId,
                    date,
                    chat.guestId,
                    messages
                );
            }

            return null;
        } catch (error) {
            console.error("Erro ao buscar dados do chat:", error);
            return null;
        }
    }

    static async getChatInfo(id: string): Promise<ChatModel | null> {
        try {
            const docRef = doc(db, "chats", id);
            const docSnapshot = await getDoc(docRef);
            const chat = docSnapshot.data();

            if (!chat) {
                return null;
            }

            if (chat) {
                const date = new Date(chat.creation.seconds * 1000);

                return new ChatModel(
                    docSnapshot.id,
                    chat.ownerId,
                    date,
                    chat.guestId
                );
            }

            return null;
        } catch (error) {
            console.error("Erro ao buscar dados do chat:", error);
            return null;
        }
    }

    static async updateChat(chat: ChatModel, chatInfo: ChatModel): Promise<ChatModel | null> {
        try {
            const docRef = doc(db, "chats", chat.getId);

            const updatedChat = new ChatModel(
                chat.getId,
                chat.getOwnerId ? chat.getOwnerId : chatInfo.getOwnerId,
                chat.getCreation ? chat.getCreation : chatInfo.getCreation,
                chat.getGuestId ? chat.getGuestId : chatInfo.getGuestId,
            );

            await updateDoc(docRef, {
                ownerId: updatedChat.getOwnerId,
                creation: updatedChat.getCreation,
                guestId: updatedChat.getGuestId
            });

            return updatedChat;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    static async saveMessage(message: MessageModel, chatId: string): Promise<void> {
        try {
            const collectionRef = collection(db, `chats/${chatId}/messages`);

            await addDoc(collectionRef, {
                message: message.getMessage,
                senderId: message.getSenderId,
                sentAt: message.getSentAt
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
