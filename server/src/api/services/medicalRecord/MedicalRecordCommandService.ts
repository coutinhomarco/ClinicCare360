import { MedicalRecordModel } from '../../models/MedicalRecordModel';
import { isValidMedicalRecordData, isValidMedicalRecordUpdateData, MedicalRecordData } from '../../utils/validations/medicalRecordValidation';

import { ServiceResponse } from '../../../@types/ServiceResponse';

//patient and doctor could not exist.
export class MedicalRecordCommandService {
    static async createMedicalRecord(medicalRecordData: any): Promise<ServiceResponse<any>> {
        try {
            const {message, status} = await isValidMedicalRecordData(medicalRecordData);
            if (status !== 200) {
                return { status, message };
            }
            const newMedicalRecord = await MedicalRecordModel.create(medicalRecordData);
            return { status: 201, data: newMedicalRecord };
        } catch (error:any) {
            return { status: 500, message: error.message };
        }
    }

    static async updateMedicalRecord(id: number, medicalRecordData: Partial<MedicalRecordData>): Promise<ServiceResponse<any>> {
        try {
            const {message, status} = await isValidMedicalRecordUpdateData(medicalRecordData);
            if (status !== 200) {
                return { status, message };
            }
            const updatedMedicalRecord = await MedicalRecordModel.update(id, medicalRecordData);
            return { status: 200, data: updatedMedicalRecord };
        } catch (error:any) {
            return { status: 500, message: error.message };
            
        }
    }

    static async deleteMedicalRecord(id: number): Promise<ServiceResponse<void>> {
        await MedicalRecordModel.delete(id);
        return { status: 204 };
    }
}
