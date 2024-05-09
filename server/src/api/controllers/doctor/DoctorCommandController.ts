import { Request, Response } from 'express';
import { DoctorCommandService } from '../../services/doctor/DoctorCommandService';

export class DoctorCommandController {
    static async createDoctor(req: Request, res: Response) {
        try {
            const doctorData = req.body;
            const newDoctor = await DoctorCommandService.createDoctor(doctorData);
            res.status(201).json(newDoctor);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateDoctor(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const doctorData = req.body;
            const updatedDoctor = await DoctorCommandService.updateDoctor(id, doctorData);
            res.json(updatedDoctor);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteDoctor(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await DoctorCommandService.deleteDoctor(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
