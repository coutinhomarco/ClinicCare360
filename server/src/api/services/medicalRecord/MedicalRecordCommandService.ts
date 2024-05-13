import { commandQueue } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { isValidMedicalRecordData, isValidMedicalRecordUpdateData, isValidMedicalRecordDelete } from '../../utils/validations/medicalRecordValidation';
import { MedicalRecordModel } from '../../models/MedicalRecordModel';
import { MedicalRecordData } from '../../utils/interfaces/medicalRecord/medicalRecordValidation';

export class MedicalRecordCommandService {
    static async createMedicalRecord(medicalRecordData: any): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidMedicalRecordData(medicalRecordData);
        if (status !== 200) {
            return { status, message };
        }
        await commandQueue.add('createMedicalRecord', medicalRecordData);
        return { status: 201, message: 'Medical record created successfully' };
    }

    static async updateMedicalRecord(id: number, medicalRecordData: Partial<MedicalRecordData>): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidMedicalRecordUpdateData(medicalRecordData);
        if (status !== 200) {
            return { status, message };
        }
        await commandQueue.add('updateMedicalRecord', { id, ...medicalRecordData });
        return { status: 200, message: 'Medical record updated successfully' };
    }

    static async deleteMedicalRecord(id: number): Promise<ServiceResponse<void>> {
        const { status, message } = await isValidMedicalRecordDelete(id);
        if (status !== 200) {
            return { status, message };
        }
        await commandQueue.add('deleteMedicalRecord', { id });
        return { status: 204, message: 'Medical record deleted successfully' };
    }
}
