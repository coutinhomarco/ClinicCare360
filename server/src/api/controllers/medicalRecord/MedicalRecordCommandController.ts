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
        const {status: statusFinal, message: messageFinal} = await MedicalRecordCommandService.createMedicalRecord(medicalRecordData);
        return res.status(statusFinal).json({ message: messageFinal});
    }

    static async updateMedicalRecord(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const medicalRecordData = req.body;
        const { status, message } = await isValidMedicalRecordUpdateData(medicalRecordData);
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        const {status: statusFinal, message: messageFinal} = await MedicalRecordCommandService.updateMedicalRecord(id, medicalRecordData);
        return res.status(statusFinal).json({message: messageFinal});
    }

    static async deleteMedicalRecord(req: Request, res: Response) {
        const { id } = req.params;
        const { status, message } = await isValidMedicalRecordDelete(Number(id));
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        const {status: statusFinal, message: messageFinal} = await MedicalRecordCommandService.deleteMedicalRecord(Number(id));
        return res.status(statusFinal).json({ message: messageFinal});
    }
}
