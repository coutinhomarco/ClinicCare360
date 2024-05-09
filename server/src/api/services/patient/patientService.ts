import { PatientModel } from '../../models/patientModel';

export class PatientService {
    static listPatients() {
        return PatientModel.findAll();
    }

    static getPatient(id: number) {
        return PatientModel.findOne(id);
    }

    static createPatient(patientData: { userId: number; firstName: string; lastName: string; dob: Date; gender: string; address: string }) {
        return PatientModel.create(patientData);
    }

    static updatePatient(id: number, patientData: { userId?: number; firstName?: string; lastName?: string; dob?: Date; gender?: string; address?: string }) {
        return PatientModel.update(id, patientData);
    }

    static deletePatient(id: number) {
        return PatientModel.delete(id);
    }
}
