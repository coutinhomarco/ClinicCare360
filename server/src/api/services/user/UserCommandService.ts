import { commandQueue } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { isValidUserData, isValidUserDataForUpdate, isValidUserDelete } from '../../utils/validations/userValidation';
import { UserModel } from '../../models/UserModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserData } from '../../utils/validations/userValidation'

const secret: string = process.env.JWT_SECRET || 'very_secret_key_here';

export class UserCommandService {
    static async createUser(userData: UserData): Promise<ServiceResponse<UserData>> {
        const validation = await isValidUserData(userData);
        if (validation.status !== 200) {
            return { status: validation.status, message: validation.message };
        }
        await commandQueue.add('createUser', userData);
        return { status: 201, message: 'User created successfully' };
    }

    static async updateUser(id: number, userData: Partial<UserData>): Promise<ServiceResponse<UserData>> {
        const validation = await isValidUserDataForUpdate(id, userData);
        if (validation.status !== 200) {
            return { status: validation.status, message: validation.message };
        }
        await commandQueue.add('updateUser', { id, ...userData });
        return { status: 200, message: 'User updated successfully' };
    }

    static async deleteUser(id: number): Promise<ServiceResponse<void>> {
        const validation = await isValidUserDelete(id);
        if (validation.status !== 200) {
            return { status: validation.status, message: validation.message };
        }
        await commandQueue.add('deleteUser', { id });
        return { status: 204, message: 'User deleted successfully' };
    }

    static async loginUser(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
        const user = await UserModel.findUserByEmail(email);
        if (!user) {
            return { status: 404, message: 'User not found' };
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return { status: 401, message: 'Invalid credentials' };
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, secret, { expiresIn: '6h' });
        return { status: 200, data: { token } };
    }
}
