export interface MedicalRecord {
    diagnosis: {
        hospitalInfo: {
            name: string;
            adressLine: string;
            city: string;
        };
        description: string;
        diseaseCode: string;
    };
    dateOfVisit: Date;
    doctor: string;
    doctorId: string;
}