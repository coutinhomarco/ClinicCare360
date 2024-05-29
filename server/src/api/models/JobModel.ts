import { commandQueue, queryQueue } from '../../config/bullmq';
import { Job } from 'bullmq';

export class JobModel {
    static async getJobStatus(jobId: string): Promise<Job | null | undefined> {
        const commandJob = await commandQueue.getJob(jobId);
        const queryJob = await queryQueue.getJob(jobId);

        return commandJob || queryJob;
    }
}
