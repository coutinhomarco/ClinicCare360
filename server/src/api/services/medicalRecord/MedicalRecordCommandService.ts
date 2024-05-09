import { MedicalRecordModel } from '../../models/MedicalRecordModel';

export class MedicalRecordCommandService {
    static async createMedicalRecord(medicalRecordData: any) {
        return MedicalRecordModel.create(medicalRecordData);
    }

    static async updateMedicalRecord(id: number, medicalRecordData: { [key: string]: any }) {
        return MedicalRecordModel.update(id, medicalRecordData);
    }

    static async deleteMedicalRecord(id: number) {
        return MedicalRecordModel.delete(id);
    }
}
