import { PatientModel } from '../../models/PatientModel';
import { UserModel } from '../../models/UserModel';
import {  isValidPatientData, isValidPatientDelete, isValidPatientUpdateData } from '../../utils/validations/patientValidation';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { PatientData } from '../../utils/interfaces/patient/patientValidation';

export class PatientCommandService {
    static async createPatient(patientData: any): Promise<ServiceResponse<any>> {
        try {
            console.log({patientData});
            
            const { status, message } = await isValidPatientData(patientData);
            if (status !== 200) {
                return { status, message };
            }
            await PatientModel.create(patientData);
            return { status: 201, message: 'Patient created successfully'};
        } catch (error: any) {
            return { status: 500, message: error.message };
        }
    }

    static async updatePatient(id: number, patientData: Partial<PatientData>): Promise<ServiceResponse<any>> {
        try {
            const { status, message } = await isValidPatientUpdateData(id, patientData);
            if (status !== 200) {
                return { status, message };
            }
            const updatedPatient = await PatientModel.update(id, patientData);
            return { status: 200, message: 'Patient updated successfully'};
        } catch (error: any) {
            return { status: 500, message: error.message };
        }
    }

    static async deletePatient(id: number): Promise<ServiceResponse<{status: number, message: string | undefined}>> {
        try {
            const { status, message } = await isValidPatientDelete(id);
            if (status !== 200) {
                return { status, message };
            }
            await PatientModel.delete(id);
            return { status: 204, message: 'Patient deleted successfully'};
        } catch (error: any) {
            return { status: 500, message: error.message };
        }
    }
}
