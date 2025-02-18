import { Router } from 'express';
import ChatRoutes from './ChatRoutes';
import AuthRoutes from './AuthRoutes';
import HealthRoutes from './HealthRoutes';

const router = Router();

router.use('/chat', ChatRoutes);
router.use('/auth', AuthRoutes);
router.use('/status', HealthRoutes);

export default router;