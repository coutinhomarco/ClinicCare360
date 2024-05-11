export interface MedicalRecordData {
    patientId: number;
    doctorId: number;
    dateOfVisit: Date;
    diagnosis: string;
    treatment: string;
}

export function isValidMedicalRecordData(data: any): data is MedicalRecordData {
    return typeof data.patientId === 'number' &&
           typeof data.doctorId === 'number' &&
           data.dateOfVisit instanceof Date &&
           typeof data.diagnosis === 'string' &&
           typeof data.treatment === 'string';
}
