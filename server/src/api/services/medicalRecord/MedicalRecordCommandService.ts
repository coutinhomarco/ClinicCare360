import { MedicalRecordModel } from '../../models/MedicalRecordModel';
import { isValidMedicalRecordData, MedicalRecordData } from '../../utils/validations/medicalRecordValidation';

import { ServiceResponse } from '../../utils/types/ServiceResponse';


export class MedicalRecordCommandService {
    static async createMedicalRecord(medicalRecordData: any): Promise<ServiceResponse<any>> {
        if (!isValidMedicalRecordData(medicalRecordData)) {
            return { status: 400, message: 'Invalid medical record data' };
        }
        const newMedicalRecord = await MedicalRecordModel.create(medicalRecordData);
        return { status: 201, data: newMedicalRecord };
    }

    static async updateMedicalRecord(id: number, medicalRecordData: Partial<MedicalRecordData>): Promise<ServiceResponse<any>> {
        const fieldsToUpdate = Object.keys(medicalRecordData) as (keyof MedicalRecordData)[];
        for (const key of fieldsToUpdate) {
            if (medicalRecordData[key] === undefined) {
                return { status: 400, message: `Invalid data for field: ${key}` };
            }
        }

        const updatedMedicalRecord = await MedicalRecordModel.update(id, medicalRecordData);
        return { status: 200, data: updatedMedicalRecord };
    }

    static async deleteMedicalRecord(id: number): Promise<ServiceResponse<void>> {
        await MedicalRecordModel.delete(id);
        return { status: 204 };
    }
}
