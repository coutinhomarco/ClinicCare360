import { PatientModel } from '../../models/PatientModel';

export class PatientCommandService {
    static async createPatient(patientData: any) {
        return PatientModel.create(patientData);
    }

    static async updatePatient(id: number, patientData: { [key: string]: any }) {
        return PatientModel.update(id, patientData);
    }

    static async deletePatient(id: number) {
        return PatientModel.delete(id);
    }
}
