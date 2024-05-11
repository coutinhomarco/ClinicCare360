import { Request, Response } from 'express';
import { MedicalRecordQueryService } from '../../services/medicalRecord/MedicalRecordQueryService';

export class MedicalRecordQueryController {
    static async listMedicalRecords(req: Request, res: Response) {
        const result = await MedicalRecordQueryService.listMedicalRecords();
        res.status(result.status).json(result.data || { message: result.message });
    }

    static async getMedicalRecord(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await MedicalRecordQueryService.getMedicalRecord(id);
        res.status(result.status).json(result.data || { message: result.message });
    }
}
