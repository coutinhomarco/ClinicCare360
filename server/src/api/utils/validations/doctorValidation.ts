export interface DoctorData {
    userId: number;
    specialization: string;
    availability: string; // Assuming this is a JSON string
}

export function isValidDoctorData(data: any): data is DoctorData {
    return typeof data.userId === 'number' &&
           typeof data.specialization === 'string' &&
           typeof data.availability === 'string';
}
