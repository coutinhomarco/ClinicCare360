import { PatientModel } from '../../models/PatientModel';
import { ServiceResponse } from '../../../@types/ServiceResponse';


export class PatientQueryService {
    static async listPatients(): Promise<ServiceResponse<any[]>> {
        try {
            const patients = await PatientModel.findAll();
            return { status: 200, data: patients };
        } catch (error) {
            return { status: 500, message: 'Failed to retrieve patients' };
        }
    }

    static async getPatient(id: number): Promise<ServiceResponse<any>> {
        try {
            if (!id) {
                return { status: 400, message: 'Invalid patient ID' };
            }
            try {
                const patient = await PatientModel.findOne(id);
                if (!patient) {
                    return { status: 404, message: "Patient not found" };
                }
                return { status: 200, data: patient };
            } catch (error) {
                return { status: 500, message: 'Error finding patient' };
            }
        } catch (error) {
            return { status: 500, message: 'Failed to retrieve patient' };
        }
    }
}
