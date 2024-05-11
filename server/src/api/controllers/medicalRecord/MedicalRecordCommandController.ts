import { Request, Response } from 'express';
import { MedicalRecordCommandService } from '../../services/medicalRecord/MedicalRecordCommandService';

export class MedicalRecordCommandController {
    static async createMedicalRecord(req: Request, res: Response) {
        const medicalRecordData = req.body;
        const result = await MedicalRecordCommandService.createMedicalRecord(medicalRecordData);
        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async updateMedicalRecord(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const medicalRecordData = req.body;
        const result = await MedicalRecordCommandService.updateMedicalRecord(id, medicalRecordData);
        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async deleteMedicalRecord(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await MedicalRecordCommandService.deleteMedicalRecord(id);
        res.status(result.status).send();
    }
}
