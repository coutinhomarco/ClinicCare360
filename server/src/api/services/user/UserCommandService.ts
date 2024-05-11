
import { UserModel } from '../../models/UserModel';
import { UserData, isValidUserData } from '../../utils/validations/userValidation';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ServiceResponse } from '../../utils/types/Response';

const secret: string = process.env.JWT_SECRET || 'secret';

export class UserCommandService {
    static async createUser(userData: UserData): Promise<ServiceResponse<UserData>> {
        if (!isValidUserData(userData)) {
            return { status: 400, message: 'Invalid user data' };
        }
        const newUser = await UserModel.createUser(userData);
        return { status: 201, data: newUser };
    }

    static async updateUser(id: number, userData: Partial<UserData>): Promise<ServiceResponse<UserData>> {
        if (Object.keys(userData).some(key => userData[key as keyof UserData] === undefined)) {
            return { status: 400, message: 'Invalid data provided' };
        }
        const updatedUser = await UserModel.updateUser(id, userData);
        return { status: 200, data: updatedUser };
    }

    static async deleteUser(id: number): Promise<ServiceResponse<void>> {
        await UserModel.deleteUser(id);
        return { status: 204 };
    }

    static async loginUser(email: string, password: string) {
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