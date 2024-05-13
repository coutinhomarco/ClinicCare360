import { queryQueue, queryQueueEvents } from '../../../config/bullmq';
import { ServiceResponse } from '../../../@types/ServiceResponse';
import { MedicalRecordModel } from '../../models/MedicalRecordModel';
import puppeteer from 'puppeteer';
import { createAtestado } from '../../utils/functions/createAtestado';

export class MedicalRecordQueryService {
    static async listMedicalRecords(): Promise<ServiceResponse<any[]>> {
        const job = await queryQueue.add('listMedicalRecords', {});
        const result = await job.waitUntilFinished(queryQueueEvents);
        return { status: 200, data: result };
    }

    static async getMedicalRecord(id: number): Promise<ServiceResponse<any>> {
        if (!id) {
            return { status: 400, message: 'Invalid medical record ID' };
        }
        const job = await queryQueue.add('getMedicalRecord', { id });
        const result = await job.waitUntilFinished(queryQueueEvents);
        if (!result) {
            return { status: 404, message: 'Medical record not found' };
        }
        return { status: 200, data: result };
    }

    static async generateAtestado(id: number): Promise<ServiceResponse<any>> {
        const response = await this.getMedicalRecord(id);
        if (response.status !== 200) {
            return response;
        }

        const record = response.data;
        const pdf = await MedicalRecordModel.generateAtestado(record);  
        

        return { status: 200, data: pdf, message: 'Atestado generated successfully' };
    }
}
