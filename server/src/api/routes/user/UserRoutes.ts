import express from 'express';
import { UserCommandController } from '../../controllers/user/UserCommandController';
import { UserQueryController } from '../../controllers/user/UserQueryController';
import { authenticateToken } from '../../utils/middleware/auth';

const router = express.Router();

// Query endpoints
router.get('/', authenticateToken, UserQueryController.listUsers);
router.get('/:id', authenticateToken, UserQueryController.getUser);

// Command endpoints
router.post('/', UserCommandController.createUser);
router.put('/:id', authenticateToken, UserCommandController.updateUser);
router.delete('/:id', authenticateToken, UserCommandController.deleteUser);
router.post('/login', UserCommandController.loginUser);

export default router;
