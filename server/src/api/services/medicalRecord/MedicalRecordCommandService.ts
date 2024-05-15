import { commandQueue, commandQueueEvents } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { isValidMedicalRecordData, isValidMedicalRecordUpdateData, isValidMedicalRecordDelete } from '../../utils/validations/medicalRecordValidation';
import { MedicalRecordModel } from '../../models/MedicalRecordModel';
import { MedicalRecordData } from '../../utils/interfaces/medicalRecord/medicalRecordValidation';

export class MedicalRecordCommandService {
    static async createMedicalRecord(medicalRecordData: any): Promise<ServiceResponse<any>> {
        try {
            const { status, message } = await isValidMedicalRecordData(medicalRecordData);
            if (status !== 200) {
                return { status, message };
            }
            await commandQueue.add('createMedicalRecord', medicalRecordData);
            return { status: 201, message: 'Medical record created successfully' };
        } catch (error: any) {
            return { status: 500, message: error || 'Failed to create medical record' };
        }
    }

    static async updateMedicalRecord(id: number, medicalRecordData: Partial<MedicalRecordData>): Promise<ServiceResponse<any>> {
        try {
            const { status, message } = await isValidMedicalRecordUpdateData(medicalRecordData);
            if (!id) return { status: 400, message: 'Invalid medical record ID' };
            if (status !== 200) {
                return { status, message };
            }
            await commandQueue.add('updateMedicalRecord', { id, ...medicalRecordData });
            return { status: 200, message: 'Medical record updated successfully' };
        } catch (error: any) {
            return { status: 500, message: error || 'Failed to update medical record' };
        }
    }

    static async deleteMedicalRecord(id: number): Promise<ServiceResponse<void>> {
        try {
            if (!id) return { status: 400, message: 'Invalid medical record ID' };
            const { status, message } = await isValidMedicalRecordDelete(id);
            if (status !== 200) {
                return { status, message };
            }
            await commandQueue.add('deleteMedicalRecord', { id });
            return { status: 204, message: 'Medical record deleted successfully' };
        } catch (error: any) {
            return { status: 500, message: error || 'Failed to delete medical record' };
        }
    }
}
