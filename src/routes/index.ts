import { Router } from 'express';
import ChatRoutes from './ChatRoutes';
import AuthRoutes from './AuthRoutes';

const router = Router();

router.use('/chat', ChatRoutes);
router.use('/auth', AuthRoutes);

export default router;