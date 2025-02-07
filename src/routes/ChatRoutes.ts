import { Router } from 'express';
import ChatController from '../controllers/ChatController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/:id', AuthMiddleware, ChatController.getChat);
router.get('/user/:ownerId', AuthMiddleware, ChatController.getUserChats);
router.post('/', AuthMiddleware, ChatController.create);
router.post('/message', AuthMiddleware, ChatController.saveMessage);
router.put('/', AuthMiddleware, ChatController.updateChat);

export default router;