import { PrismaClient } from '@prisma/client';
import puppeteer from 'puppeteer';
import { createAtestado } from '../utils/functions/createAtestado';

const prisma = new PrismaClient();

export class MedicalRecordModel {
    static async findAll() {
        return await prisma.medicalRecord.findMany({
            include: {
                patient: true,
                doctor: true
            }
        });
    }

    static async findOne(id: number) {
        return await prisma.medicalRecord.findUnique({
            where: { id },
            include: {
                doctor: true,
                patient: true
            }
        });
    }

    static async create(medicalRecordData: {
        patientId: number,
        doctorId: number,
        dateOfVisit: Date,
        diagnosis: string,
        treatment: string,
    }) {
        return await prisma.medicalRecord.create({
            data: medicalRecordData
        });
    }

    static async update(id: number, medicalRecordData: {
        patientId?: number,
        doctorId?: number,
        dateOfVisit?: Date,
        diagnosis?: string,
        treatment?: string,
    }) {
        return await prisma.medicalRecord.update({
            where: { id },
            data: medicalRecordData
        });
    }

    static async delete(id: number) {
        return await prisma.medicalRecord.delete({
            where: { id }
        });
    }

    static async generateAtestado(record: any) {
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
        return pdfBuffer;
    }
}
