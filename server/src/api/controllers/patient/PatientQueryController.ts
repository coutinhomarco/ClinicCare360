import { Request, Response } from 'express';
import { PatientQueryService } from '../../services/patient/PatientQueryService';

export class PatientQueryController {
    static async listPatients(req: Request, res: Response) {
        try {
            const patients = await PatientQueryService.listPatients();
            res.json(patients);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getPatient(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const patient = await PatientQueryService.getPatient(id);
            if (patient) {
                res.json(patient);
            } else {
                res.status(404).json({ message: "Patient not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
