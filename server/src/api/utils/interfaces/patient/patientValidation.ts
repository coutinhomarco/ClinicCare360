export interface PatientData {
    userId: number;
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    address: string;
}

export interface PatientUpdateData {
    firstName?: string | undefined;
    lastName?: string | undefined;
    dob?: Date | undefined
    gender?: string | undefined;
    address?: string | undefined;
}