import express from 'express';
import { UserCommandController } from '../../controllers/user/UserCommandController';
import { UserQueryController } from '../../controllers/user/UserQueryController';

const router = express.Router();

router.get('/', UserQueryController.listUsers);
router.get('/:id', UserQueryController.getUser);
router.post('/', UserCommandController.createUser);
router.put('/:id', UserCommandController.updateUser);
router.delete('/:id', UserCommandController.deleteUser);

export default router;
