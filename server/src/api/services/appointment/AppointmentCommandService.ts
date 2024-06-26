import { commandQueue, commandQueueEvents } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { isValidAppointmentData, isValidAppointmentUpdateData, isValidAppointmentDelete } from '../../utils/validations/appointmentValidation';
import { AppointmentModel } from '../../models/AppointmentModel';
import { AppointmentData } from '../../utils/interfaces/appointment/appointmentValidation';

export class AppointmentCommandService {
    static async createAppointment(appointmentData: any): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidAppointmentData(appointmentData);
        if (status !== 200) {
            return { status, message };
        }
        const job = await commandQueue.add('createAppointment', appointmentData);
        return { status: 201, message: 'Appointment created successfully', data: { jobId: job.id }};
    }

    static async updateAppointment(id: number, appointmentData: Partial<AppointmentData>): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidAppointmentUpdateData(appointmentData);
        if (status !== 200) {
            return { status, message };
        }
        const job = await commandQueue.add('updateAppointment', { id, ...appointmentData });
        return { status: 200, message: 'Appointment updated successfully', data: { jobId: job.id }};
    }

    static async deleteAppointment(id: number): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidAppointmentDelete(id);
        if (status !== 200) {
            return { status, message };
        }
        const job = await commandQueue.add('deleteAppointment', { id });
        return { status: 204, message: 'Appointment deleted successfully',data: { jobId: job.id } };
    }
}
