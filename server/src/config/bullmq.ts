// src/config/bullmq.ts
import { Queue, Worker, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';
import { AppointmentCommandService } from '../api/services/appointment/AppointmentCommandService';
import { AppointmentQueryService } from '../api/services/appointment/AppointmentQueryService';

const connection = new IORedis();

export const commandQueue = new Queue('commandQueue', { connection });
export const queryQueue = new Queue('queryQueue', { connection });

export const commandQueueEvents = new QueueEvents('commandQueue', { connection });
export const queryQueueEvents = new QueueEvents('queryQueue', { connection });

export const commandWorker = new Worker('commandQueue', async job => {
    switch (job.name) {
        case 'createAppointment':
            await AppointmentCommandService.createAppointment(job.data);
            break;
        case 'updateAppointment':
            await AppointmentCommandService.updateAppointment(job.data.id, job.data);
            break;
        case 'deleteAppointment':
            await AppointmentCommandService.deleteAppointment(job.data.id);
            break;
        // Add other command handlers here
    }
}, { connection });

export const queryWorker = new Worker('queryQueue', async job => {
    switch (job.name) {
        case 'listAppointments':
            return await AppointmentQueryService.listAppointments();
        case 'getAppointment':
            return await AppointmentQueryService.getAppointment(job.data.id);
        // Add other query handlers here
    }
}, { connection });
