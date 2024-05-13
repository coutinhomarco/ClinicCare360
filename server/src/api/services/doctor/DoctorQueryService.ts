import { queryQueue, queryQueueEvents } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { DoctorModel } from '../../models/DoctorModel';

export class DoctorQueryService {
    static async listDoctors(): Promise<ServiceResponse<any[]>> {
        const job = await queryQueue.add('listDoctors', {});
        const result = await job.waitUntilFinished(queryQueueEvents);
        return { status: 200, data: result };
    }

    static async findDoctor(id: number): Promise<ServiceResponse<any>> {
        if (!id) {
            return { status: 400, message: 'Invalid doctor ID' };
        }
        const job = await queryQueue.add('getDoctor', { id });
        const result = await job.waitUntilFinished(queryQueueEvents);
        if (!result) {
            return { status: 404, message: "Doctor not found" };
        }
        return { status: 200, data: result };
    }
}
