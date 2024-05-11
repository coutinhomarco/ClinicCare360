import { Request, Response } from 'express';
import { AppointmentQueryService } from '../../services/appointment/AppointmentQueryService';

export class AppointmentQueryController {
    static async listAppointments(req: Request, res: Response) {
        const result = await AppointmentQueryService.listAppointments();
        res.status(result.status).json(result.data || { message: result.message });
    }

    static async getAppointment(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await AppointmentQueryService.getAppointment(id);
        res.status(result.status).json(result.data || { message: result.message });
    }
}
