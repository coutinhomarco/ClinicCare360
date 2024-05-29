import { isValidUserData, isValidUserDataForUpdate, isValidUserDelete } from '../src/api/utils/validations/userValidation';
import { UserModel } from '../src/api/models/UserModel';
import { UserData } from '../src/api/utils/validations/userValidation';

jest.mock('../src/api/models/UserModel');

describe('User Validation', () => {
    it('should return 400 if email is already in use', async () => {
        (UserModel.findUserByEmail as jest.Mock).mockResolvedValue({ id: 1 });
        const data: UserData = { username: 'testuser', email: 'test@example.com', password: 'password', role: 'user' };
        const result = await isValidUserData(data);
        expect(result.status).toBe(400);
        expect(result.message).toBe('Email already in use');
    });

    it('should return 400 if required fields are missing', async () => {
        (UserModel.findUserByEmail as jest.Mock).mockResolvedValue(null);
        const data = { username: 'testuser', email: '', password: 'password', role: 'user' } as Partial<UserData>; // Missing email
        const result = await isValidUserData(data as UserData);
        expect(result.status).toBe(400);
        expect(result.message).toBe('Missing required fields');
    });

    it('should return 200 if all required fields are present and email is not in use', async () => {
        (UserModel.findUserByEmail as jest.Mock).mockResolvedValue(null);
        const data: UserData = { username: 'testuser', email: 'test@example.com', password: 'password', role: 'user' };
        const result = await isValidUserData(data);
        expect(result.status).toBe(200);
    });

    it('should return 400 if no update data provided', async () => {
        const data = {};
        const result = await isValidUserDataForUpdate(1, data);
        expect(result.status).toBe(400);
        expect(result.message).toBe('No update data provided');
    });

    it('should return 200 if update data is provided', async () => {
        const data = { email: 'newemail@example.com' };
        const result = await isValidUserDataForUpdate(1, data);
        expect(result.status).toBe(200);
    });

    it('should return 404 if user does not exist for deletion', async () => {
        (UserModel.getUserById as jest.Mock).mockResolvedValue(null);
        const result = await isValidUserDelete(1);
        expect(result.status).toBe(404);
        expect(result.message).toBe('User not found');
    });

    it('should return 200 if user exists for deletion', async () => {
        (UserModel.getUserById as jest.Mock).mockResolvedValue({ id: 1 });
        const result = await isValidUserDelete(1);
        expect(result.status).toBe(200);
    });
});
