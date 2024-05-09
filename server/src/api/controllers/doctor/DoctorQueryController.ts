import { Request, Response } from 'express';
import { DoctorQueryService } from '../services/doctor/DoctorQueryService';

export class DoctorQueryController {
    static async listDoctors(req: Request, res: Response) {
        try {
            const doctors = await DoctorQueryService.listDoctors();
            res.json(doctors);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getDoctor(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const doctor = await DoctorQueryService.findDoctor(id);
            if (doctor) {
                res.json(doctor);
            } else {
                res.status(404).json({ message: "Doctor not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
