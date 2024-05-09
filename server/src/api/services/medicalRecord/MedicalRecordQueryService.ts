import { MedicalRecordModel } from '../../models/MedicalRecordModel';

export class MedicalRecordQueryService {
    static async listMedicalRecords() {
        return MedicalRecordModel.findAll();
    }

    static async getMedicalRecord(id: number) {
        return MedicalRecordModel.findOne(id);
    }
}
