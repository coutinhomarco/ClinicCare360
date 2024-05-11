import { MedicalRecordModel } from '../../models/MedicalRecordModel';
import { ServiceResponse } from '../../utils/types/ServiceResponse';


export class MedicalRecordQueryService {
    static async listMedicalRecords(): Promise<ServiceResponse<any[]>> {
        try {
            const medicalRecords = await MedicalRecordModel.findAll();
            return { status: 200, data: medicalRecords };
        } catch (error) {
            return { status: 500, message: 'Failed to retrieve medical records' };
        }
    }

    static async getMedicalRecord(id: number): Promise<ServiceResponse<any>> {
        if (!id) {
            return { status: 400, message: 'Invalid medical record ID' };
        }
        try {
            const medicalRecord = await MedicalRecordModel.findOne(id);
            if (!medicalRecord) {
                return { status: 404, message: "Medical record not found" };
            }
            return { status: 200, data: medicalRecord };
        } catch (error) {
            return { status: 500, message: 'Error finding medical record' };
        }
    }
}
