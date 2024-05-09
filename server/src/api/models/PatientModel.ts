import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PatientModel {
    static async findAll() {
        return await prisma.patient.findMany();
    }

    static async findOne(id: number) {
        return await prisma.patient.findUnique({
            where: { id },
        });
    }

    static async create(data: { userId: number; firstName: string; lastName: string; dob: Date; gender: string; address: string }) {
        return await prisma.patient.create({
            data,
        });
    }

    static async update(id: number, data: { userId?: number; firstName?: string; lastName?: string; dob?: Date; gender?: string; address?: string }) {
        return await prisma.patient.update({
            where: { id },
            data,
        });
    }

    static async delete(id: number) {
        return await prisma.patient.delete({
            where: { id },
        });
    }
}
