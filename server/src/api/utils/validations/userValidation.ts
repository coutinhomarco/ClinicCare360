export interface UserData {
    username: string;
    email: string;
    password: string;
    role: string;
}

export function isValidUserData(data: any): data is UserData {
    return typeof data.username === 'string' &&
           typeof data.email === 'string' &&
           typeof data.password === 'string' &&
           typeof data.role === 'string';
}
