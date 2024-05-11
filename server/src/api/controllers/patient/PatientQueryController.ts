import { Request, Response } from 'express';
import { PatientQueryService } from '../../services/patient/PatientQueryService';

export class PatientQueryController {
    static async listPatients(req: Request, res: Response) {
        const result = await PatientQueryService.listPatients();
        res.status(result.status).json(result.data || { message: result.message });
    }

    static async getPatient(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await PatientQueryService.getPatient(id);
        res.status(result.status).json(result.data || { message: result.message });
    }
}
