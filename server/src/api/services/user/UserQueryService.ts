import { UserModel } from '../../models/UserModel';
import { UserData } from '../../utils/validations/userValidation';
import { ServiceResponse } from '../../utils/types/ServiceResponse';

export class UserQueryService {
    static async listUsers(): Promise<ServiceResponse<UserData[]>> {
        try {
            const users = await UserModel.getAllUsers();
            return { status: 200, data: users };
        } catch (error) {
            return { status: 500, message: 'Failed to retrieve users' };
        }
    }

    static async findUser(id: number): Promise<ServiceResponse<UserData>> {
        if (!id) {
            return { status: 400, message: 'Invalid user ID' };
        }
        try {
            const user = await UserModel.getUserById(id);
            if (!user) {
                return { status: 404, message: "User not found" };
            }
            return { status: 200, data: user };
        } catch (error) {
            return { status: 500, message: 'Error finding user' };
        }
    }
}
