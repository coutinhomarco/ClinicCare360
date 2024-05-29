import { commandQueue, commandQueueEvents } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { isValidDoctorData, isValidDoctorUpdateData, isValidDoctorDelete } from '../../utils/validations/doctorValidation';
import { DoctorModel } from '../../models/DoctorModel';
import { DoctorData } from '../../utils/interfaces/doctor/doctorValidation';

export class DoctorCommandService {
    static async createDoctor(doctorData: any): Promise<ServiceResponse<any>> {
        try {            
            const { status, message } = await isValidDoctorData(doctorData);
            if (status !== 200) {
                return { status, message };
            }
            const job = await commandQueue.add('createDoctor', doctorData);
            return { status: 201, message: 'Doctor created successfully', data: { jobId: job.id }};
        } catch (error: any) {
            console.error('Error in createDoctor:', error);
            return { status: 500, message: error.message || 'Failed to create doctor' };
        }
    }

    static async updateDoctor(id: number, doctorData: Partial<DoctorData>): Promise<ServiceResponse<any>> {
        try {
            const { status, message } = await isValidDoctorUpdateData(doctorData);
            if (status !== 200) {
                return { status, message };
            }
            const job = await commandQueue.add('updateDoctor', { id, ...doctorData });
            return { status: 200, message: 'Doctor updated successfully', data: { jobId: job.id }};
        } catch (error: any) {
            console.error('Error in updateDoctor:', error);
            return { status: 500, message: error.message || 'Failed to update doctor' };
        }
    }

    static async deleteDoctor(id: number): Promise<ServiceResponse<any>> {
        try {
            const { status, message } = await isValidDoctorDelete(id);
            if (status !== 200) {
                return { status, message };
            }
            const job = await commandQueue.add('deleteDoctor', { id });
            return { status: 204, message: 'Doctor deleted successfully', data: { jobId: job.id }};
        } catch (error: any) {
            console.error('Error in deleteDoctor:', error);
            return { status: 500, message: error.message || 'Failed to delete doctor' };
        }
    }
}
