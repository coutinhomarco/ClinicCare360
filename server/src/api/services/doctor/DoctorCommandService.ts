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
        await commandQueue.add('createDoctor', doctorData);
        return { status: 201, message: 'Doctor created successfully' };
    }

    static async updateDoctor(id: number, doctorData: Partial<DoctorData>): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidDoctorUpdateData(doctorData);
        if (status !== 200) {
            return { status, message };
        }
        await commandQueue.add('updateDoctor', { id, ...doctorData });
        return { status: 200, message: 'Doctor updated successfully' };
    }

    static async deleteDoctor(id: number): Promise<ServiceResponse<void>> {
        const { status, message } = await isValidDoctorDelete(id);
        if (status !== 200) {
            return { status, message };
        }
        await commandQueue.add('deleteDoctor', { id });
        return { status: 204, message: 'Doctor deleted successfully' };
    }
}
