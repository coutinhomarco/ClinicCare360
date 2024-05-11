import { Request, Response } from 'express';
import { UserQueryService } from '../../services/user/UserQueryService';

export class UserQueryController {
    static async listUsers(req: Request, res: Response) {
        const result = await UserQueryService.listUsers();
        res.status(result.status).json(result.data || { message: result.message });
    }

    static async getUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await UserQueryService.findUser(id);
        res.status(result.status).json(result.data || { message: result.message });
    }
}
