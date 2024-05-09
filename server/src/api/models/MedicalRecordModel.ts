import { PrismaClient } from '@prisma/client';

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
                patient: true,
                doctor: true
            }
        });
    }

    static async create(medicalRecordData: {
        patientId: number,
        doctorId: number,
        dateOfVisit: Date,
        diagnosis: string,
        treatment: string
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
        treatment?: string
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
}
