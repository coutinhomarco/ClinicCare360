import { Request, Response } from 'express';
import { MedicalRecordQueryService } from '../../services/medicalRecord/MedicalRecordQueryService';

export class MedicalRecordQueryController {
    static async listMedicalRecords(req: Request, res: Response) {
        try {
            const medicalRecords = await MedicalRecordQueryService.listMedicalRecords();
            res.json(medicalRecords);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getMedicalRecord(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const medicalRecord = await MedicalRecordQueryService.getMedicalRecord(id);
            if (medicalRecord) {
                res.json(medicalRecord);
            } else {
                res.status(404).json({ message: "Medical record not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
