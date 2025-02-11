import { db } from "../config/firebaseConfig";
import { collection, query, where, getDocs, setDoc, doc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import ChatModel from "../models/ChatModel";
import MessageModel from "../models/MessageModel";

export default class ChatDal {
    static async createChat(chat: ChatModel): Promise<boolean> {
        try {
            await setDoc(doc(db, "chats", chat.getId), {
                ownerId: chat.getOwnerId,
                ownerUsername: chat.getOwnerUsername,
                creation: chat.getCreation
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
            const ownerChatsQuery = query(
                collection(db, "chats"),
                where("ownerId", "==", ownerId)
            );
            const ownerChatsSnapshot = await getDocs(ownerChatsQuery);
            const ownerChats: ChatModel[] = ownerChatsSnapshot.docs.map((doc: any) => new ChatModel(
                doc.id,
                doc.data().ownerId,
                doc.data().ownerUsername,
                doc.data().creation,
                doc.data().guestId,
                doc.data().guestUsername,
            ));

            const guestChatsQuery = query(
                collection(db, "chats"),
                where("guestId", "==", ownerId)
            );
            const guestChatsSnapshot = await getDocs(guestChatsQuery);
            const guestChats: ChatModel[] = guestChatsSnapshot.docs.map((doc: any) => new ChatModel(
                doc.id,
                doc.data().ownerId,
                doc.data().ownerUsername,
                doc.data().creation,
                doc.data().guestId,
                doc.data().guestUsername,
            ));

            return [...ownerChats, ...guestChats];
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
                    doc.data().senderUsername,
                    new Date(doc.data().sentAt * 1000),
                    doc.id
                );
            });

            if (chat) {
                const date = new Date(chat.creation.seconds * 1000);

                return new ChatModel(
                    docSnapshot.id,
                    chat.ownerId,
                    chat.ownerUsername,
                    date,
                    chat.guestId,
                    chat.guestUsername,
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
                    chat.ownerUsername,
                    date,
                    chat.guestId,
                    chat.guestUsername
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
                chat.getOwnerUsername ? chat.getOwnerUsername : chatInfo.getOwnerUsername,
                chat.getCreation ? chat.getCreation : chatInfo.getCreation,
                chat.getGuestId ? chat.getGuestId : chatInfo.getGuestId,
                chat.getGuestUsername ? chat.getGuestUsername : chatInfo.getGuestUsername,
            );

            await updateDoc(docRef, {
                ownerId: updatedChat.getOwnerId,
                ownerUsername: updatedChat.getOwnerUsername,
                creation: updatedChat.getCreation,
                guestId: updatedChat.getGuestId,
                guestUsername: updatedChat.getGuestUsername,
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
                senderUsername: message.getSenderUsername,
                sentAt: message.getSentAt
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
