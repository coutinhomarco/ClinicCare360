import { Request, Response } from 'express';
import { DoctorCommandService } from '../../services/doctor/DoctorCommandService';

export class DoctorCommandController {
    static async createDoctor(req: Request, res: Response) {
        console.log('Received request to create doctor:', req.body);
        const doctorData = req.body;
        const result = await DoctorCommandService.createDoctor(doctorData);
        return res.status(result.status).json({ message: result.message, data: result.data.jobId });
    }

    static async updateDoctor(req: Request, res: Response) {
        console.log('Received request to update doctor:', req.params.id, req.body);
        const id = parseInt(req.params.id);
        const doctorData = req.body;
        const result = await DoctorCommandService.updateDoctor(id, doctorData);
        return res.status(result.status).json({ message: result.message, data: result.data.jobId });
    }

    static async deleteDoctor(req: Request, res: Response) {
        console.log('Received request to delete doctor:', req.params.id);
        const id = parseInt(req.params.id);
        const result = await DoctorCommandService.deleteDoctor(id);
        return res.status(result.status).json({ message: result.message, data: result.data.jobId });
    }
}
