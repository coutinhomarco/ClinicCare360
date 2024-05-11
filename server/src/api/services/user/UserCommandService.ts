
import { UserModel } from '../../models/UserModel';
import { UserData, isValidUserData } from '../../utils/validations/userValidation';

interface ServiceResponse<T> {
    status: number;
    data?: T;
    message?: string;
}

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
}