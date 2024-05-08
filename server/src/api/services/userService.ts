import { UserModel } from '../models/userModel';

export class UserService {
    static async listUsers() {
        return await UserModel.getAllUsers();
    }

    static async findUser(id: number) {
        return await UserModel.getUserById(id);
    }

    static async createUser(userData: { username: string; email: string; password: string; role: string }) {
        // Add logic for password
        return await UserModel.createUser(userData);
    }

    static async updateUser(id: number, userData: { username?: string; email?: string; password?: string; role?: string }) {
        // Additional business logic
        return await UserModel.updateUser(id, userData);
    }

    static async deleteUser(id: number) {
        // Add any cleanup prior to deletion, if necessary
        return await UserModel.deleteUser(id);
    }
}
