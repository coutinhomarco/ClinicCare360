import { DoctorModel } from '../../models/DoctorModel';
import { isValidDoctorData, DoctorData, isValidDoctorDataForUpdate, isValidDoctorDelete } from '../../utils/validations/doctorValidation';

import { ServiceResponse } from '../../../@types/ServiceResponse';


export class DoctorCommandService {
    static async createDoctor(doctorData: any): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidDoctorData(doctorData);
        if (status !== 200) {
            return { status, message };
        }
        await DoctorModel.createDoctor(doctorData);
        return { status , message: 'Doctor created successfully'};
    }

    static async updateDoctor(id: number, doctorData: Partial<DoctorData>): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidDoctorDataForUpdate(id, doctorData);
        if (status !== 200) {
            return { status, message };
        }
        const updatedDoctor = await DoctorModel.updateDoctor(id, doctorData);
        return { status: 200, data: updatedDoctor };
    }

    static async deleteDoctor(id: number): Promise<ServiceResponse<void>> {
        const { status, message } = await isValidDoctorDelete(id);
        if (status !== 200) {
            return { status, message };
        }
        await DoctorModel.deleteDoctor(id);
        return { status: 204 };
    }
}
