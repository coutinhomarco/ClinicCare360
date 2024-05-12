export interface MedicalRecordData {
    patientId: number;
    doctorId: number;
    dateOfVisit: Date;
    diagnosis: string;
    treatment: string;
    id?: number;
}

export interface MedicalRecordUpdateData {
    dateOfVisit?: Date | undefined;
    diagnosis?: string | undefined;
    treatment?: string | undefined;
    patientId?: number | undefined;
    doctorId?: number | undefined;
    id?: number | undefined;
}