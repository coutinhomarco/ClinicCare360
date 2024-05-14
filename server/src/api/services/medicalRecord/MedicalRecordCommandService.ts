import { commandQueue } from '../../../config/bullmq';
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
            const jobId = `createMedicalRecord-${medicalRecordData.patientId}-${medicalRecordData.dateOfVisit}`;
            await commandQueue.add('createMedicalRecord', medicalRecordData, { jobId });
            return { status: 201, message: 'Medical record creation job added to queue' };
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
        const jobId = `updateMedicalRecord-${id}`;
        await commandQueue.add('updateMedicalRecord', { id, ...medicalRecordData }, { jobId });
        return { status: 200, message: 'Medical record update job added to queue' };
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
            const jobId = `deleteMedicalRecord-${id}`;
            await commandQueue.add('deleteMedicalRecord', { id }, { jobId });
            return { status: 204, message: 'Medical record deletion job added to queue' };
        } catch (error: any) {
            return { status: 500, message: error || 'Failed to delete medical record' };
        }
    }
}
