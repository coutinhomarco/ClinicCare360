export interface PatientData {
    userId: number;
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    address: string;
}

export function isValidPatientData(data: any): data is PatientData {
    return typeof data.userId === 'number' &&
           typeof data.firstName === 'string' &&
           typeof data.lastName === 'string' &&
           data.dob instanceof Date &&
           typeof data.gender === 'string' &&
           typeof data.address === 'string';
}
