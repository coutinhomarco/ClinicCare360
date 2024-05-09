import { Request, Response } from 'express';
import { MedicalRecordCommandService } from '../../services/medicalRecord/MedicalRecordCommandService';

export class MedicalRecordCommandController {
    static async createMedicalRecord(req: Request, res: Response) {
        try {
            const medicalRecordData = req.body;
            const newMedicalRecord = await MedicalRecordCommandService.createMedicalRecord(medicalRecordData);
            res.status(201).json(newMedicalRecord);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateMedicalRecord(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const medicalRecordData = req.body;
            const updatedMedicalRecord = await MedicalRecordCommandService.updateMedicalRecord(id, medicalRecordData);
            res.json(updatedMedicalRecord);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteMedicalRecord(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await MedicalRecordCommandService.deleteMedicalRecord(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
