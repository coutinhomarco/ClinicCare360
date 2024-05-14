import { commandQueue } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { isValidDoctorData, isValidDoctorUpdateData, isValidDoctorDelete } from '../../utils/validations/doctorValidation';
import { DoctorModel } from '../../models/DoctorModel';
import { DoctorData } from '../../utils/interfaces/doctor/doctorValidation';

export class DoctorCommandService {
    static async createDoctor(doctorData: any): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidDoctorData(doctorData);
        
        if (status !== 200) {
            return { status, message };
        }
        const jobId = `createDoctor-${doctorData.userId}`;
        await commandQueue.add('createDoctor', doctorData, { jobId });
        return { status: 201, message: 'Doctor creation job added to queue' };
    }

    static async updateDoctor(id: number, doctorData: Partial<DoctorData>): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidDoctorUpdateData(doctorData);
        if (status !== 200) {
            return { status, message };
        }
        const jobId = `updateDoctor-${id}`;
        await commandQueue.add('updateDoctor', { id, ...doctorData }, { jobId });
        return { status: 200, message: 'Doctor update job added to queue' };
    }

    static async deleteDoctor(id: number): Promise<ServiceResponse<void>> {
        const { status, message } = await isValidDoctorDelete(id);
        if (status !== 200) {
            return { status, message };
        }
        const jobId = `deleteDoctor-${id}`;
        await commandQueue.add('deleteDoctor', { id }, { jobId });
        return { status: 204, message: 'Doctor deletion job added to queue' };
    }
}
