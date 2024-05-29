import { Request, Response } from 'express';
import { JobService } from '../../services/jobs/JobService';

export class JobController {
    static async getJobStatus(req: Request, res: Response) {
        const jobId = req.params.id;
        const result = await JobService.getJobStatus(jobId);
        return res.status(result.status).json(result);
    }
}
