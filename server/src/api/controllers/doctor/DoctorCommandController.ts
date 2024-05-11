import { Request, Response } from 'express';
import { DoctorCommandService } from '../../services/doctor/DoctorCommandService';

export class DoctorCommandController {
    static async createDoctor(req: Request, res: Response) {
        const doctorData = req.body;
        const result = await DoctorCommandService.createDoctor(doctorData);
        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async updateDoctor(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const doctorData = req.body;
        const result = await DoctorCommandService.updateDoctor(id, doctorData);
        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async deleteDoctor(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await DoctorCommandService.deleteDoctor(id);
        res.status(result.status).send();
    }
}
