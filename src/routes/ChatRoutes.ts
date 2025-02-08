import { Router } from 'express';
import ChatController from '../controllers/ChatController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/info/:id?', ChatController.getChatInfo);
router.get('/user/:ownerId?', AuthMiddleware, ChatController.getUserChats);
router.get('/:id?', AuthMiddleware, ChatController.getChat);
router.post('/', AuthMiddleware, ChatController.create);
router.post('/message', AuthMiddleware, ChatController.saveMessage);
router.put('/', AuthMiddleware, ChatController.updateChat);

export default router;