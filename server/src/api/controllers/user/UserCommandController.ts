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
        const {status: statusFinal, message: messageFinal} = await UserCommandService.createUser(userData);
        res.status(statusFinal).json({message:messageFinal});
    }

    static async updateUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const userData = req.body;
        const validation = await isValidUserDataForUpdate(id, userData);
        if (validation.status !== 200) {
            return res.status(validation.status).json({ message: validation.message });
        }
        const {status: statusFinal, message: messageFinal} = await UserCommandService.updateUser(id, userData);
        res.status(statusFinal).json({ message: messageFinal });
    }

    static async deleteUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const validation = await isValidUserDelete(id);
        if (validation.status !== 200) {
            return res.status(validation.status).json({ message: validation.message });
        }
        const {status: statusFinal, message: messageFinal} = await UserCommandService.deleteUser(id);
        res.status(statusFinal).json({ message: messageFinal });
    }

    static async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;
        const validations = email && password && typeof email === 'string' && typeof password === 'string';
        if (!validations) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const { status, data } = await UserCommandService.loginUser(email, password);
        res.status(status).json({message: "User logged in successfully", data});
    }
}
