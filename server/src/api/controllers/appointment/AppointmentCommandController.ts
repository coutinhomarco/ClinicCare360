import { Request, Response } from 'express';
import { AppointmentCommandService } from '../../services/appointment/AppointmentCommandService';
import { isValidAppointmentDelete } from '../../utils/validations/appointmentValidation';

export class AppointmentCommandController {
    static async createAppointment(req: Request, res: Response) {
        const appointmentData = req.body;
        const result = await AppointmentCommandService.createAppointment(appointmentData);
        if (result.status === 200) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async updateAppointment(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const appointmentData = req.body;
        const result = await AppointmentCommandService.updateAppointment(id, appointmentData);
        if (result.status === 200) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async deleteAppointment(req: Request, res: Response) {
        const { id } = req.params;
        const { status, message } = await isValidAppointmentDelete(Number(id));
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        await AppointmentCommandService.deleteAppointment(Number(id));
        return res.status(status).json({ message: 'Appointment deleted successfully'});
    }
}
