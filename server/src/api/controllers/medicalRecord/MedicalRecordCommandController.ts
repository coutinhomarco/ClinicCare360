import { Request, Response } from 'express';
import { MedicalRecordCommandService } from '../../services/medicalRecord/MedicalRecordCommandService';
import { isValidMedicalRecordDelete, isValidMedicalRecordData, isValidMedicalRecordUpdateData } from '../../utils/validations/medicalRecordValidation';

export class MedicalRecordCommandController {
    static async createMedicalRecord(req: Request, res: Response) {
        const medicalRecordData = req.body;
        const { status, message } = await isValidMedicalRecordData(medicalRecordData);
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        const result = await MedicalRecordCommandService.createMedicalRecord(medicalRecordData);
        return res.status(result.status).json({ message: "Medical record created sucessfuly"});
    }

    static async updateMedicalRecord(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const medicalRecordData = req.body;
        const { status, message } = await isValidMedicalRecordUpdateData(medicalRecordData);
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        const result = await MedicalRecordCommandService.updateMedicalRecord(id, medicalRecordData);
        return res.status(result.status).json(result.data);
    }

    static async deleteMedicalRecord(req: Request, res: Response) {
        const { id } = req.params;
        const { status, message } = await isValidMedicalRecordDelete(Number(id));
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        await MedicalRecordCommandService.deleteMedicalRecord(Number(id));
        return res.status(status).json({ message: 'Medical record deleted successfully'});
    }
}
