import { DoctorModel } from '../../models/DoctorModel';

export class DoctorQueryService {
    static async listDoctors() {
        return await DoctorModel.getAllDoctors();
    }

    static async findDoctor(id: number) {
        return await DoctorModel.getDoctorById(id);
    }
}
