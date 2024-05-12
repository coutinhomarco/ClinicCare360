import { Request, Response } from 'express';
import { AppointmentCommandService } from '../../services/appointment/AppointmentCommandService';
import { isValidAppointmentDelete, isValidAppointmentData, isValidAppointmentUpdateData } from '../../utils/validations/appointmentValidation';

export class AppointmentCommandController {
    static async createAppointment(req: Request, res: Response) {
        const appointmentData = req.body;
        const { status, message } = await isValidAppointmentData(appointmentData.patientId);
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        const result = await AppointmentCommandService.createAppointment(appointmentData);
        return res.status(result.status).json(result.data);
    }

    static async updateAppointment(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const appointmentData = req.body;
        const { status, message } = await isValidAppointmentUpdateData(appointmentData.patientId);
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        const result = await AppointmentCommandService.updateAppointment(id, appointmentData);
        return res.status(result.status).json(result.data);
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
