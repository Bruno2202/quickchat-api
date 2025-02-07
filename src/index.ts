import ChatBll from "./bll/ChatBll";
import routes from "./routes/index"

const { createServer } = require('node:http');
const { Server } = require('socket.io');

const express = require('express');
const cors = require('cors');
const app = express();
const server = createServer(app);

const corsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', routes);

const io = new Server(server, {
    cors: corsOptions,
});

interface MessageRequest {
    chatId: string;
    message: any;
}

io.on('connect', (socket: any) => {
    const socketId = socket.id;
    console.log(`Usuário conectado: ${socket.id}`);


    socket.on('joinRoom', async (chatId: string) => {
        try {
            const chat = await ChatBll.getChat(chatId);

            if (chat) {
                socket.to(chat.getOwnerId).emit('guestAccess', {
                    chatId,
                    socketId
                })
                socket.join(chatId);

                console.log(`Usuário ${socket.id} entrou na sala ${chatId}`);
            } else {
                console.log(`Chat com ID ${chatId} não encontrado.`);
            }
        } catch (error) {
            console.error(`Erro ao entrar na sala ${chatId}:`, error);
        }
    });


    socket.on('leaveRoom', async (chatId: string) => {
        console.log(`Saindo da sala ${chatId}...`);
        socket.leave(chatId);
    });


    socket.on('sendMessage', ({ chatId, message }: MessageRequest) => {
        try {
            const sendMessage = async () => {
                await ChatBll.saveMessage(message, chatId);
            }
            sendMessage();

            socket.to(chatId).emit('receiveMessage', message);
            console.log(`${message.senderId} enviando mensagem na sala ${chatId}...`);
        } catch (error) {
            console.log(`Erro ao salvar messagem no banco de dados: ${error}`);
        }
    });

    
    socket.on('disconnect', () => {
        console.log(`Usuário desconectado: ${socket.id}`);
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000 🚀');
});