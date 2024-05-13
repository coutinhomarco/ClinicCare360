export interface DoctorData {
    userId: number;
    specialization: string;
    availability: string;
    firstName: string;
    lastName: string;
}

export interface DoctorUpdateData {
    specialization?: string | undefined;
    availability?: string | undefined;
    userId?: number | undefined;
}