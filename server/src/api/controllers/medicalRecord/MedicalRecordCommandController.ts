import { Request, Response } from 'express';
import { MedicalRecordCommandService } from '../../services/medicalRecord/MedicalRecordCommandService';
import { isValidMedicalRecordDelete } from '../../utils/validations/medicalRecordValidation';

export class MedicalRecordCommandController {
    static async createMedicalRecord(req: Request, res: Response) {
        const medicalRecordData = req.body;
        const result = await MedicalRecordCommandService.createMedicalRecord(medicalRecordData);
        if (result.status === 200) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async updateMedicalRecord(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const medicalRecordData = req.body;
        const result = await MedicalRecordCommandService.updateMedicalRecord(id, medicalRecordData);
        if (result.status === 200) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async deleteMedicalRecord(req: Request, res: Response) {
        const { id } = req.params;
        const { status, message } = await isValidMedicalRecordDelete(id);
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        await MedicalRecordCommandService.deleteMedicalRecord(Number(id));
        return res.status(status).json({ message: 'Medical record deleted successfully'});
    }
}
