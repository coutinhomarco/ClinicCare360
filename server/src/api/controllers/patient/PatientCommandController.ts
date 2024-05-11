import { Request, Response } from 'express';
import { PatientCommandService } from '../../services/patient/PatientCommandService';

export class PatientCommandController {
    static async createPatient(req: Request, res: Response) {
        const patientData = req.body;
        const result = await PatientCommandService.createPatient(patientData);
        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async updatePatient(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const patientData = req.body;
        const result = await PatientCommandService.updatePatient(id, patientData);
        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async deletePatient(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await PatientCommandService.deletePatient(id);
        res.status(result.status).send();
    }
}
