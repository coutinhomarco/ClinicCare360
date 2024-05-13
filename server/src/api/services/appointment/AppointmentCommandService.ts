import { commandQueue } from '../../../config/bullmq';
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
        const jobId = `createAppointment-${appointmentData.patientId}-${appointmentData.appointmentDate}`;
        await commandQueue.add('createAppointment', appointmentData, { jobId });
        return { status: 201, message: 'Appointment creation job added to queue' };
    }

    static async updateAppointment(id: number, appointmentData: Partial<AppointmentData>): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidAppointmentUpdateData(appointmentData);
        if (status !== 200) {
            return { status, message };
        }
        const jobId = `updateAppointment-${id}`;
        await commandQueue.add('updateAppointment', { id, ...appointmentData }, { jobId });
        return { status: 200, message: 'Appointment update job added to queue' };
    }

    static async deleteAppointment(id: number): Promise<ServiceResponse<void>> {
        const { status, message } = await isValidAppointmentDelete(id);
        if (status !== 200) {
            return { status, message };
        }
        const jobId = `deleteAppointment-${id}`;
        await commandQueue.add('deleteAppointment', { id }, { jobId });
        return { status: 204, message: 'Appointment deletion job added to queue' };
    }
}
