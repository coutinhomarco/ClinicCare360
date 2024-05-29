import { JobModel } from '../../models/JobModel';
import { ServiceResponse } from '../../../@types/ServiceResponse';

export class JobService {
    static async getJobStatus(jobId: string): Promise<ServiceResponse<any>> {
        const job = await JobModel.getJobStatus(jobId);

        if (!job) {
            return { status: 404, message: 'Job not found' };
        }

        const jobStatus = await job.getState();
        const result = {
            id: job.id,
            name: job.name,
            status: jobStatus,
            result: job.returnvalue,
            failedReason: job.failedReason,
            stacktrace: job.stacktrace,
        };

        return { status: 200, message: 'Job status retrieved successfully', data: result };
    }
}
