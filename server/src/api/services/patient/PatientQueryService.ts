import { queryQueue, queryQueueEvents } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { PatientModel } from '../../models/PatientModel';

export class PatientQueryService {
    static async listPatients(): Promise<ServiceResponse<any[]>> {
        const job = await queryQueue.add('listPatients', {});
        const result = await job.waitUntilFinished(queryQueueEvents);
        return { status: 200, data: result };
    }

    static async getPatient(id: number): Promise<ServiceResponse<any>> {
        if (!id) {
            return { status: 400, message: 'Invalid patient ID' };
        }
        const job = await queryQueue.add('getPatient', { id });
        const result = await job.waitUntilFinished(queryQueueEvents);
        if (!result) {
            return { status: 404, message: 'Patient not found' };
        }
        return { status: 200, data: result };
    }
}
