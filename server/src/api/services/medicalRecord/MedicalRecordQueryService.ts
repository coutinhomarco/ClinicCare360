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
        const html = createAtestado({
            diagnosis: {
                hospitalInfo: {
                    name: 'Hospital Name',
                    addressLine: record?.patient.address || 'Address Line',
                    city: "City Name"
                },
                description: record?.diagnosis || 'Diagnosis',
                diseaseCode: "Disease Code",
            },
            dateOfVisit: record?.dateOfVisit.toLocaleDateString() || 'Date of Visit',
            doctor: `${record?.doctor.firstName} ${record?.doctor.lastName}` || 'Doctor Name',
            doctorId: record?.doctor.id.toString() || 'Doctor ID',
        });

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();

        return { status: 200, data: pdfBuffer, message: 'Atestado generated successfully' };
    }
}
