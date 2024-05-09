import { Request, Response } from 'express';
import { UserService } from '../../services/user/userService';

export class UserController {
    static async listUsers(req: Request, res: Response) {
        try {
            const users = await UserService.listUsers();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await UserService.findUser(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createUser(req: Request, res: Response) {
        try {
            const { username, email, password, role } = req.body;
            const newUser = await UserService.createUser({ username, email, password, role });
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { username, email, password, role } = req.body;
            const updatedUser = await UserService.updateUser(id, { username, email, password, role });
            res.json(updatedUser);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await UserService.deleteUser(id);
            res.status(204).send();  // No content to send back
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
