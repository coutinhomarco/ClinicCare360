import { Request, Response } from 'express';
import { UserCommandService } from '../../services/user/UserCommandService';

export class UserCommandController {
    static async createUser(req: Request, res: Response) {
        const userData = req.body;
        const result = await UserCommandService.createUser(userData);
        result.data ? res.status(result.status).json(result.data) : res.status(result.status).json({ message: result.message });
    }

    static async updateUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const userData = req.body;
        const result = await UserCommandService.updateUser(id, userData);
        result.data ? res.json(result.data) : res.status(result.status).json({ message: result.message });
    }

    static async deleteUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await UserCommandService.deleteUser(id);
        res.status(result.status).send();
    }
}
