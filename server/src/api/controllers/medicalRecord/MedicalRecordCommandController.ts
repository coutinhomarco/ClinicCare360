import { Request, Response } from 'express';
import { MedicalRecordCommandService } from '../../services/medicalRecord/MedicalRecordCommandService';
import { isValidMedicalRecordDelete, isValidMedicalRecordData, isValidMedicalRecordUpdateData } from '../../utils/validations/medicalRecordValidation';

export class MedicalRecordCommandController {
    static async createMedicalRecord(req: Request, res: Response) {
        const medicalRecordData = req.body;
        const result = await MedicalRecordCommandService.createMedicalRecord(medicalRecordData);
        return res.status(result.status).json({ message: result.message });
    }

    static async updateMedicalRecord(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const medicalRecordData = req.body;
        const result = await MedicalRecordCommandService.updateMedicalRecord(id, medicalRecordData);
        return res.status(result.status).json({ message: result.message });
    }

    static async deleteMedicalRecord(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await MedicalRecordCommandService.deleteMedicalRecord(id);
        return res.status(result.status).json({ message: result.message });
    }
}
