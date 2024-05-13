// src/api/services/doctor/DoctorQueryService.ts
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { DoctorModel } from '../../models/DoctorModel';

export class DoctorQueryService {
    static async listDoctors(): Promise<ServiceResponse<any[]>> {
        try {
            const doctors = await DoctorModel.getAllDoctors();
            return { status: 200, data: doctors };
        } catch (error) {
            return { status: 500, message: 'Failed to retrieve doctors' };
        }
    }

    static async findDoctor(id: number): Promise<ServiceResponse<any>> {
        if (!id) {
            return { status: 400, message: 'Invalid doctor ID' };
        }
        try {
            const doctor = await DoctorModel.getDoctorById(id);
            if (!doctor) {
                return { status: 404, message: 'Doctor not found' };
            }
            return { status: 200, data: doctor };
        } catch (error) {
            return { status: 500, message: 'Error finding doctor' };
        }
    }
}
