import { UserModel } from '../../models/UserModel';
import { UserData, isValidUserData } from '../../utils/validations/userValidation';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ServiceResponse } from '../../../@types/ServiceResponse';

const secret: string = process.env.JWT_SECRET || 'very_secret_key_here';  // Ensure this is secure

export class UserCommandService {
    static async createUser(userData: UserData): Promise<ServiceResponse<UserData>> {
        if (!isValidUserData(userData)) {
            return { status: 400, message: 'Invalid user data' };
        }
        try {
            const user = await UserModel.findUserByEmail(userData.email);
            if (user) {
                return { status: 500, message: 'This email is already being used.' };
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
            await UserModel.createUser(userData);
            return { status: 201, message: 'User created'};
        } catch (error) {
            return { status: 500, message: 'Error creating user' };
        }
    }

    static async updateUser(id: number, userData: Partial<UserData>): Promise<ServiceResponse<UserData>> {
        if (Object.keys(userData).some(key => userData[key as keyof UserData] === undefined)) {
            return { status: 400, message: 'Invalid data provided' };
        }
        try {
            const user = await UserModel.getUserById(id);
            if (!user) {
                return { status: 500, message: 'This account doens not exists.' };
            }
            if (userData.password) {
                userData.password = await bcrypt.hash(userData.password, 10);
            }
            const updatedUser = await UserModel.updateUser(id, userData);
            return { status: 200, data: updatedUser };
        } catch (error) {
            return { status: 500, message: 'Error updating user' };
        }
    }

    static async deleteUser(id: number): Promise<ServiceResponse<void>> {
        try {
            const user = await UserModel.getUserById(id);
            if (!user) {
                return { status: 500, message: 'This account doens not exists.' };
            }
            await UserModel.deleteUser(id);
            return { status: 204 };
        } catch (error) {
            return { status: 500, message: 'Error deleting user' };
        }
    }

    static async loginUser(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
        try {
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
        } catch (error) {
            return { status: 500, message: 'Error logging in user' };
        }
    }
}
