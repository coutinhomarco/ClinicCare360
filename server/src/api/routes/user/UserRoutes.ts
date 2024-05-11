import express from 'express';
import { UserCommandController } from '../../controllers/user/UserCommandController';
import { UserQueryController } from '../../controllers/user/UserQueryController';
import { authenticateToken } from '../../utils/middleware/auth';

const router = express.Router();

router.get('/' ,authenticateToken ,UserQueryController.listUsers);
router.get('/:id',authenticateToken , UserQueryController.getUser);
router.post('/', UserCommandController.createUser);
router.put('/:id',authenticateToken , UserCommandController.updateUser);
router.delete('/:id',authenticateToken , UserCommandController.deleteUser);
router.post('/login', UserCommandController.loginUser);

export default router;
