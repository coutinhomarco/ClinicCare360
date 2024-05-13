import { queryQueue, queryQueueEvents } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { AppointmentModel } from '../../models/AppointmentModel';

export class AppointmentQueryService {
    static async listAppointments(): Promise<ServiceResponse<any[]>> {
        const job = await queryQueue.add('listAppointments', {});
        const result = await job.waitUntilFinished(queryQueueEvents);
        return { status: 200, data: result };
    }

    static async getAppointment(id: number): Promise<ServiceResponse<any>> {
        if (!id) {
            return { status: 400, message: 'Invalid appointment ID' };
        }
        const job = await queryQueue.add('getAppointment', { id });
        const result = await job.waitUntilFinished(queryQueueEvents);
        if (!result) {
            return { status: 404, message: "Appointment not found" };
        }
        return { status: 200, data: result };
    }
}
