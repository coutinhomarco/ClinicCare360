import { Request, Response } from 'express';
import { UserQueryService } from '../../services/user/UserQueryService';

export class UserQueryController {
    static async listUsers(req: Request, res: Response) {
        const users = await UserQueryService.listUsers();
        res.json(users);
    }

    static async getUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const user = await UserQueryService.findUser(id);
        user ? res.json(user) : res.status(404).json({ message: "User not found" });
    }
}
