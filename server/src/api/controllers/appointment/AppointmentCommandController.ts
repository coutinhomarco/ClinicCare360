import { Request, Response } from 'express';
import { AppointmentCommandService } from '../../services/appointment/AppointmentCommandService';

export class AppointmentCommandController {
    static async createAppointment(req: Request, res: Response) {
        try {
            const appointmentData = req.body;
            const newAppointment = await AppointmentCommandService.createAppointment(appointmentData);
            res.status(201).json(newAppointment);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateAppointment(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const appointmentData = req.body;
            const updatedAppointment = await AppointmentCommandService.updateAppointment(id, appointmentData);
            res.json(updatedAppointment);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deleteAppointment(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await AppointmentCommandService.deleteAppointment(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
