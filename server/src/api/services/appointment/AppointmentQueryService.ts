// src/api/services/appointment/AppointmentQueryService.ts
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { AppointmentModel } from '../../models/AppointmentModel';

export class AppointmentQueryService {
    static async listAppointments(): Promise<ServiceResponse<any[]>> {
        try {
            const appointments = await AppointmentModel.findAll();
            return { status: 200, data: appointments };
        } catch (error) {
            return { status: 500, message: 'Failed to retrieve appointments' };
        }
    }

    static async getAppointment(id: number): Promise<ServiceResponse<any>> {
        if (!id) {
            return { status: 400, message: 'Invalid appointment ID' };
        }
        try {
            const appointment = await AppointmentModel.findOne(id);
            if (!appointment) {
                return { status: 404, message: 'Appointment not found' };
            }
            return { status: 200, data: appointment };
        } catch (error) {
            return { status: 500, message: 'Error finding appointment' };
        }
    }
}
