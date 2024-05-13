import { commandQueue } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { isValidPatientData, isValidPatientUpdateData, isValidPatientDelete } from '../../utils/validations/patientValidation';
import { PatientModel } from '../../models/PatientModel';
import { PatientData } from '../../utils/interfaces/patient/patientValidation';

export class PatientCommandService {
    static async createPatient(patientData: any): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidPatientData(patientData);
        if (status !== 200) {
            return { status, message };
        }
        await commandQueue.add('createPatient', patientData);
        return { status: 201, message: 'Patient created successfully' };
    }

    static async updatePatient(id: number, patientData: Partial<PatientData>): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidPatientUpdateData(id, patientData);
        if (status !== 200) {
            return { status, message };
        }
        await commandQueue.add('updatePatient', { id, ...patientData });
        return { status: 200, message: 'Patient updated successfully' };
    }

    static async deletePatient(id: number): Promise<ServiceResponse<void>> {
        const { status, message } = await isValidPatientDelete(id);
        if (status !== 200) {
            return { status, message };
        }
        await commandQueue.add('deletePatient', { id });
        return { status: 204, message: 'Patient deleted successfully' };
    }
}
