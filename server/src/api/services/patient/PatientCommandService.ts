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
        const jobId = `createPatient-${patientData.email}`;
        await commandQueue.add('createPatient', patientData, { jobId });
        return { status: 201, message: 'Patient creation job added to queue' };
    }

    static async updatePatient(id: number, patientData: Partial<PatientData>): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidPatientUpdateData(id, patientData);
        if (status !== 200) {
            return { status, message };
        }
        const jobId = `updatePatient-${id}`;
        await commandQueue.add('updatePatient', { id, ...patientData }, { jobId });
        return { status: 200, message: 'Patient update job added to queue' };
    }

    static async deletePatient(id: number): Promise<ServiceResponse<void>> {
        const { status, message } = await isValidPatientDelete(id);
        if (status !== 200) {
            return { status, message };
        }
        const jobId = `deletePatient-${id}`;
        await commandQueue.add('deletePatient', { id }, { jobId });
        return { status: 204, message: 'Patient deletion job added to queue' };
    }
}
