import { DoctorModel } from '../../models/DoctorModel';
import { isValidDoctorData, DoctorData } from '../../utils/validations/doctorValidation';

import { ServiceResponse } from '../../utils/types/Response';


export class DoctorCommandService {
    static async createDoctor(doctorData: any): Promise<ServiceResponse<any>> {
        if (!isValidDoctorData(doctorData)) {
            return { status: 400, message: 'Invalid doctor data' };
        }
        const newDoctor = await DoctorModel.createDoctor(doctorData);
        return { status: 201, data: newDoctor };
    }

    static async updateDoctor(id: number, doctorData: Partial<DoctorData>): Promise<ServiceResponse<any>> {
        const fieldsToUpdate = Object.keys(doctorData) as (keyof DoctorData)[];
        for (const key of fieldsToUpdate) {
            if (doctorData[key] === undefined) {
                return { status: 400, message: `Invalid data for field: ${key}` };
            }
        }

        const updatedDoctor = await DoctorModel.updateDoctor(id, doctorData);
        return { status: 200, data: updatedDoctor };
    }

    static async deleteDoctor(id: number): Promise<ServiceResponse<void>> {
        await DoctorModel.deleteDoctor(id);
        return { status: 204 };
    }
}
