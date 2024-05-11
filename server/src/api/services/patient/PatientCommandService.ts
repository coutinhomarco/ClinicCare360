import { PatientModel } from '../../models/PatientModel';
import { PatientData, isValidPatientData } from '../../utils/validations/patientValidation';


interface ServiceResponse<T> {
    status: number;
    data?: T;
    message?: string;
}

export class PatientCommandService {
    static async createPatient(patientData: any): Promise<ServiceResponse<any>> {
        if (!isValidPatientData(patientData)) {
            return { status: 400, message: 'Invalid patient data' };
        }
        const newPatient = await PatientModel.create(patientData);
        return { status: 201, data: newPatient };
    }

    static async updatePatient(id: number, patientData: Partial<PatientData>): Promise<ServiceResponse<any>> {
        const fieldsToUpdate = Object.keys(patientData) as (keyof PatientData)[];
        for (const key of fieldsToUpdate) {
            if (patientData[key] === undefined) {
                return { status: 400, message: `Invalid data for field: ${key}` };
            }
        }

        const updatedPatient = await PatientModel.update(id, patientData);
        return { status: 200, data: updatedPatient };
    }

    static async deletePatient(id: number): Promise<ServiceResponse<void>> {
        await PatientModel.delete(id);
        return { status: 204 };
    }
}
