import express from 'express';
import { JobController } from '../../controllers/job/JobController';

const router = express.Router();

router.get('/status/:id', JobController.getJobStatus);

export default router;
