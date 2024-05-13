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

    static async generateAtestado(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await MedicalRecordQueryService.generateAtestado(id);
        if (result.status === 200) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=atestado-${id}.pdf`);
            res.send(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }
}
