import { DoctorModel } from '../../models/DoctorModel';

export class DoctorCommandService {
    static async createDoctor(doctorData: { [key: string]: any }) {
        return await DoctorModel.createDoctor(doctorData);
    }

    static async updateDoctor(id: number, doctorData: { [key: string]: any }) {
        return await DoctorModel.updateDoctor(id, doctorData);
    }

    static async deleteDoctor(id: number) {
        return await DoctorModel.deleteDoctor(id);
    }
}
