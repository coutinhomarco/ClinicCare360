import { queryQueue } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { UserModel } from '../../models/UserModel';
import { UserData } from '../../utils/validations/userValidation';

export class UserQueryService {
    static async listUsers(): Promise<ServiceResponse<UserData[]>> {
        const users = await UserModel.getAllUsers(); // Fetch users directly
        return { status: 200, data: users };
    }

    static async findUser(id: number): Promise<ServiceResponse<UserData>> {
        if (!id) {
            return { status: 400, message: 'Invalid user ID' };
        }
        const user = await UserModel.getUserById(id);
        if (!user) {
            return { status: 404, message: 'User not found' };
        }
        return { status: 200, data: user };
    }
}
