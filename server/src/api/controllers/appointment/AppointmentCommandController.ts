import { Request, Response } from 'express';
import { AppointmentCommandService } from '../../services/appointment/AppointmentCommandService';

export class AppointmentCommandController {
    static async createAppointment(req: Request, res: Response) {
        const appointmentData = req.body;
        const result = await AppointmentCommandService.createAppointment(appointmentData);
        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async updateAppointment(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const appointmentData = req.body;
        const result = await AppointmentCommandService.updateAppointment(id, appointmentData);
        if (result.data) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async deleteAppointment(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await AppointmentCommandService.deleteAppointment(id);
        res.status(result.status).send();
    }
}
