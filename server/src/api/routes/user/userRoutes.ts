import express from 'express';
import { UserController } from '../../controllers/user/userController';

const router = express.Router();

router.get('/users', UserController.listUsers);
router.get('/users/:id', UserController.getUser);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;
