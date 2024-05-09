import { Request, Response } from 'express';
import { AppointmentQueryService } from '../../services/appointment/AppointmentQueryService';

export class AppointmentQueryController {
    static async listAppointments(req: Request, res: Response) {
        try {
            const appointments = await AppointmentQueryService.listAppointments();
            res.json(appointments);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getAppointment(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const appointment = await AppointmentQueryService.getAppointment(id);
            if (appointment) {
                res.json(appointment);
            } else {
                res.status(404).json({ message: "Appointment not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
