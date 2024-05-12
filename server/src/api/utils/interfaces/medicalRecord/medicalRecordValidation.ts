export interface MedicalRecordData {
    patientId: number;
    doctorId: number;
    dateOfVisit: Date;
    diagnosis: string;
    treatment: string;
    id?: number;
}