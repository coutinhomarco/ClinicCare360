import { PatientModel } from '../../models/PatientModel';

export class PatientQueryService {
    static async listPatients() {
        return PatientModel.findAll();
    }

    static async getPatient(id: number) {
        return PatientModel.findOne(id);
    }
}
