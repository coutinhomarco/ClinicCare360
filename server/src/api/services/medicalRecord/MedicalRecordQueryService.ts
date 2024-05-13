import { MedicalRecordModel } from '../../models/MedicalRecordModel';
import puppeteer from 'puppeteer';
import { createAtestado } from '../../utils/functions/createAtestado';  // Ajust this import based on your actual file structure

export class MedicalRecordQueryService {
    static async listMedicalRecords() {
        try {
            const medicalRecords = await MedicalRecordModel.findAll();
            return { status: 200, data: medicalRecords };
        } catch (error) {
            console.error(error);
            return { status: 500, message: 'Failed to retrieve medical records' };
        }
    }

    static async getMedicalRecord(id: number) {
        if (!id) {
            return { status: 400, message: 'Invalid medical record ID' };
        }
        try {
            const medicalRecord = await MedicalRecordModel.findOne(id);
            if (!medicalRecord) {
                return { status: 404, message: 'Medical record not found' };
            }
            return { status: 200, data: medicalRecord, contentType: undefined };
        } catch (error) {
            console.error(error);
            return { status: 500, message: 'Error finding medical record' };
        }
    }

    static async generateAtestado(id: number) {
        const response = await this.getMedicalRecord(id);
        if (response.status !== 200) {
            return response;  // Return error response directly
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
