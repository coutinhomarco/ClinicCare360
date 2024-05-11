import { Request, Response } from 'express';
import { DoctorQueryService } from '../../services/doctor/DoctorQueryService';

export class DoctorQueryController {
    static async listDoctors(req: Request, res: Response) {
        const result = await DoctorQueryService.listDoctors();
        res.status(result.status).json(result.data || { message: result.message });
    }

    static async getDoctor(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await DoctorQueryService.findDoctor(id);
        res.status(result.status).json(result.data || { message: result.message });
    }
}
