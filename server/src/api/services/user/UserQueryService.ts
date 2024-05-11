import { UserModel } from '../../models/UserModel';
import { UserData } from '../../utils/validations/userValidation';


export class UserQueryService {
    static async listUsers(): Promise<UserData[]> {
        return await UserModel.getAllUsers();
    }

    static async findUser(id: number): Promise<UserData | null> {
        return await UserModel.getUserById(id);
    }
}