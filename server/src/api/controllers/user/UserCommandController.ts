import { Request, Response } from 'express';
import { UserCommandService } from '../../services/user/UserCommandService';
import { isValidUserData, isValidUserDataForUpdate, isValidUserDelete } from '../../utils/validations/userValidation';

export class UserCommandController {
    static async createUser(req: Request, res: Response) {
        const userData = req.body;
        const validation = await isValidUserData(userData);
        if (validation.status !== 200) {
            return res.status(validation.status).json({ message: validation.message });
        }
        const result = await UserCommandService.createUser(userData);
        res.status(result.status).json(result.data ? result.data : { message: result.message });
    }

    static async updateUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const userData = req.body;
        const validation = await isValidUserDataForUpdate(id, userData);
        if (validation.status !== 200) {
            return res.status(validation.status).json({ message: validation.message });
        }
        const result = await UserCommandService.updateUser(id, userData);
        res.status(result.status).json(result.data ? result.data : { message: result.message });
    }

    static async deleteUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const validation = await isValidUserDelete(id);
        if (validation.status !== 200) {
            return res.status(validation.status).json({ message: validation.message });
        }
        const result = await UserCommandService.deleteUser(id);
        res.status(result.status).send();
    }

    static async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await UserCommandService.loginUser(email, password);
        res.status(result.status).json(result.data ? result.data : { message: result.message });
    }
}
