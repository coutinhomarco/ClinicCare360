import { PatientModel } from '../../models/PatientModel';
import { UserModel } from '../../models/UserModel';
import { PatientData, isValidPatientData, isValidPatientDelete } from '../../utils/validations/patientValidation';
import { ServiceResponse } from '../../../@types/ServiceResponse';


export class PatientCommandService {
    static async createPatient(patientData: any): Promise<ServiceResponse<any>> {
        try {
            const user = await UserModel.findUserByEmail(patientData.email);
            if (!user) {
                return { status: 404, message: 'User not found' };
            }
            if (!isValidPatientData(patientData)) {
                return { status: 400, message: 'Invalid patient data' };
            }
            await PatientModel.create(patientData);
            return { status: 201, message: 'Patient created successfully'};
        } catch (error: any) {
            return { status: 500, message: error.message };
        }
    }

    static async updatePatient(id: number, patientData: Partial<PatientData>): Promise<ServiceResponse<any>> {
        try {
            const user = await UserModel.getUserById(id);
            if (!user) {
                return { status: 404, message: 'User not found' };
            }
            const fieldsToUpdate = Object.keys(patientData) as (keyof PatientData)[];
            for (const key of fieldsToUpdate) {
                if (patientData[key] === undefined) {
                    return { status: 400, message: `Invalid data for field: ${key}` };
                }
            }
            const updatedPatient = await PatientModel.update(id, patientData);
            return { status: 200, data: updatedPatient };
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
